import {Link} from 'react-router-dom';
import {ArrowRight} from 'lucide-react';
import {useTranslation} from 'react-i18next';
import type {Service} from '@/data/services';
import {isLocale} from '@/i18n';

export function ServiceCard({service, langPrefix}: {service: Service; langPrefix: string}) {
  const {t, i18n} = useTranslation();
  const locale = isLocale(i18n.language) ? i18n.language : 'bg';
  const tr = service.translations[locale];
  const Icon = service.icon;

  return (
    <Link
      to={`${langPrefix}/uslugi/${service.slug}`}
      className="group flex flex-col rounded-2xl border border-zinc-200 bg-white p-6 hover:border-brand-300 hover:shadow-md transition-all"
    >
      <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-600 group-hover:bg-brand-100 transition-colors">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-5 text-lg font-semibold text-zinc-900">{tr.title}</h3>
      <p className="mt-2 text-sm text-zinc-600 flex-1">{tr.short}</p>
      <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 group-hover:gap-2 transition-all">
        {t('common.learnMore')}
        <ArrowRight className="h-4 w-4" />
      </div>
    </Link>
  );
}
