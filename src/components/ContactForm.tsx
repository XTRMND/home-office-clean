import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {useTranslation} from 'react-i18next';
import {CheckCircle2, AlertTriangle} from 'lucide-react';
import {Button} from '@/components/ui/Button';
import {siteInfo} from '@/data/siteInfo';
import {cn} from '@/lib/cn';
import {fireFormConversion} from '@/lib/analytics';

const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT;
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

const phoneRe = /^[+\d][\d\s\-().]{5,}$/;

function makeSchema(t: (k: string) => string) {
  return z.object({
    name: z.string().optional(),
    phone: z
      .string()
      .min(1, t('form.errors.phoneRequired'))
      .regex(phoneRe, t('form.errors.phoneInvalid')),
    email: z
      .string()
      .min(1, t('form.errors.emailRequired'))
      .email(t('form.errors.emailInvalid')),
    message: z
      .string()
      .min(1, t('form.errors.messageRequired'))
      .min(10, t('form.errors.messageTooShort')),
    marketingOptIn: z.boolean(),
    // Web3Forms honeypot — bots fill this; we reject if non-empty.
    botcheck: z.string().optional(),
  });
}

type FormValues = z.infer<ReturnType<typeof makeSchema>>;
type Status = 'idle' | 'submitting' | 'success' | 'error';

export function ContactForm({className}: {className?: string}) {
  const {t, i18n} = useTranslation();
  const [status, setStatus] = useState<Status>('idle');

  const schema = makeSchema(t);
  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {marketingOptIn: true, botcheck: ''},
  });

  const onSubmit = async (values: FormValues) => {
    if (values.botcheck) {
      // honeypot triggered — silently succeed without sending
      setStatus('success');
      return;
    }
    setStatus('submitting');
    try {
      if (FORM_ENDPOINT && WEB3FORMS_KEY) {
        // Web3Forms payload shape: access_key + the fields you want included in
        // the admin email. `subject` and `from_name` are special, the rest end
        // up as a key:value table in the delivered message.
        const subject =
          values.name
            ? `Ново запитване от ${values.name} (${i18n.language.toUpperCase()})`
            : `Ново запитване (${i18n.language.toUpperCase()})`;
        const res = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: {'Content-Type': 'application/json', Accept: 'application/json'},
          body: JSON.stringify({
            access_key: WEB3FORMS_KEY,
            subject,
            from_name: values.name || 'Site contact form',
            name: values.name || '',
            phone: values.phone,
            email: values.email,
            message: values.message,
            marketing_opt_in: values.marketingOptIn ? 'yes' : 'no',
            locale: i18n.language,
            source_url: window.location.href,
            referrer: document.referrer || '',
            submitted_at: new Date().toISOString(),
          }),
        });
        const json: {success?: boolean; message?: string} = await res
          .json()
          .catch(() => ({}));
        if (!res.ok || !json.success) {
          throw new Error(json.message || `Form endpoint returned ${res.status}`);
        }
      } else {
        // No endpoint configured yet — log payload, pretend it worked.
        // eslint-disable-next-line no-console
        console.info('[form] stub (set VITE_FORM_ENDPOINT + VITE_WEB3FORMS_ACCESS_KEY):', values);
        await new Promise((r) => setTimeout(r, 500));
      }
      fireFormConversion();
      reset({marketingOptIn: true, botcheck: ''});
      setStatus('success');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('[form] submit failed:', err);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className={cn('rounded-2xl border border-emerald-200 bg-emerald-50 p-6', className)}>
        <div className="flex items-start gap-3">
          <CheckCircle2 className="h-6 w-6 text-emerald-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-emerald-900">{t('form.successTitle')}</h3>
            <p className="mt-1 text-sm text-emerald-800">{t('form.successBody')}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className={cn('space-y-4', className)}
      aria-busy={status === 'submitting'}
    >
      {status === 'error' && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 flex items-start gap-2 text-sm text-red-800">
          <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
          <div>
            <strong className="font-medium">{t('form.errorTitle')}</strong>
            <p>{t('form.errorBody', {phone: siteInfo.phone})}</p>
          </div>
        </div>
      )}

      {/* honeypot — visually hidden, screen-reader hidden, but bots fill it */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        {...register('botcheck')}
        className="absolute -left-[9999px] opacity-0 pointer-events-none h-0 w-0"
      />

      <Field label={t('form.name')} htmlFor="name">
        <input
          id="name"
          type="text"
          autoComplete="name"
          {...register('name')}
          className={inputCls()}
        />
      </Field>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label={t('form.phone')} htmlFor="phone" error={errors.phone?.message}>
          <input
            id="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            {...register('phone')}
            className={inputCls(!!errors.phone)}
          />
        </Field>
        <Field label={t('form.email')} htmlFor="email" error={errors.email?.message}>
          <input
            id="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            {...register('email')}
            className={inputCls(!!errors.email)}
          />
        </Field>
      </div>

      <Field label={t('form.message')} htmlFor="message" error={errors.message?.message}>
        <textarea
          id="message"
          rows={4}
          placeholder={t('form.messagePlaceholder')}
          required
          {...register('message')}
          className={inputCls(!!errors.message)}
        />
      </Field>

      <label className="flex items-start gap-2 text-sm text-zinc-600">
        <input
          type="checkbox"
          {...register('marketingOptIn')}
          className="mt-1 h-4 w-4 rounded border-zinc-300 text-brand-500 focus:ring-brand-500"
        />
        <span>{t('form.marketingOptIn')}</span>
      </label>

      <Button type="submit" disabled={status === 'submitting'} size="lg" className="w-full sm:w-auto">
        {status === 'submitting' ? t('form.submitting') : t('form.submit')}
      </Button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-zinc-700 mb-1.5">
        {label}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

function inputCls(hasError = false) {
  return cn(
    'w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 transition-colors',
    'focus:outline-none focus:ring-2 focus:ring-brand-500/30',
    hasError
      ? 'border-red-300 focus:border-red-500 focus:ring-red-500/30'
      : 'border-zinc-300 focus:border-brand-500',
  );
}
