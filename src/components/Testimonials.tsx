import {useTranslation} from 'react-i18next';
import {Star, ExternalLink} from 'lucide-react';
import {Container} from '@/components/ui/Container';
import {Section} from '@/components/ui/Section';
import {testimonials, googleAggregate, type Testimonial} from '@/data/testimonials';
import type {Locale} from '@/data/services';

function Stars({rating}: {rating: number}) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} / 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={
            i <= Math.round(rating)
              ? 'h-4 w-4 fill-amber-400 text-amber-400'
              : 'h-4 w-4 fill-zinc-200 text-zinc-200'
          }
        />
      ))}
    </div>
  );
}

function pickForLocale(locale: Locale): Testimonial[] {
  const native = testimonials.filter((t) => t.lang === locale);
  return native.length > 0 ? native : [...testimonials];
}

export function Testimonials({locale}: {locale: Locale}) {
  const {t} = useTranslation();
  if (testimonials.length === 0) return null;
  const ordered = pickForLocale(locale);

  return (
    <Section variant="muted">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="text-sm font-semibold uppercase tracking-wider text-brand-600">
              {t('testimonials.eyebrow')}
            </div>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900">
              {t('testimonials.title')}
            </h2>
            <p className="mt-3 text-zinc-600">{t('testimonials.subtitle')}</p>
          </div>
          <a
            href={googleAggregate.url}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm shadow-sm hover:border-brand-300"
          >
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-zinc-900">{googleAggregate.rating.toFixed(1)}</span>
                <Stars rating={googleAggregate.rating} />
              </div>
              <span className="text-xs text-zinc-500">
                {t('testimonials.googleReviews', {count: googleAggregate.count})}
              </span>
            </div>
            <ExternalLink className="h-4 w-4 text-zinc-400" />
          </a>
        </div>

        <div className="mt-10 overflow-x-auto pb-4 snap-x snap-mandatory [scrollbar-width:thin]">
          <ul className="flex gap-4">
            {ordered.map((r, i) => (
              <li
                key={`${r.name}-${i}`}
                className="snap-start shrink-0 w-[300px] sm:w-[340px] rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm flex flex-col"
              >
                <Stars rating={r.rating} />
                <p className="mt-4 text-zinc-700 leading-relaxed">“{r.text}”</p>
                <div className="mt-5 pt-4 border-t border-zinc-100 flex items-center gap-3 text-sm">
                  {r.avatar ? (
                    <img
                      src={r.avatar}
                      alt=""
                      loading="lazy"
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full object-cover bg-zinc-100"
                    />
                  ) : null}
                  <div>
                    <div className="font-medium text-zinc-900">{r.name}</div>
                    <div className="text-zinc-500">{r.date}</div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
