import { Helmet } from 'react-helmet-async';

export default function SEOHead({ title, description, canonical, ogImage }) {
    const siteName = 'विमला जाँच घर';
    const siteNameEn = 'Vimla Janch Ghar';
    const fullTitle = title ? `${title} | ${siteNameEn}` : `${siteNameEn} — Reliable Diagnostics. Trusted Care.`;
    const defaultDesc = 'विमला जाँच घर provides reliable pathology and diagnostic laboratory testing services including CBC, thyroid, liver, kidney, lipid profile, urine tests and more.';
    const desc = description || defaultDesc;
    const url = canonical ? `https://vimlajanch.com${canonical}` : 'https://vimlajanch.com';

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={desc} />
            <link rel="canonical" href={url} />

            {/* Open Graph */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={desc} />
            <meta property="og:url" content={url} />
            <meta property="og:site_name" content={siteNameEn} />
            {ogImage && <meta property="og:image" content={ogImage} />}

            {/* Twitter */}
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={desc} />
        </Helmet>
    );
}
