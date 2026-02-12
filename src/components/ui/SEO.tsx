import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../../context/LanguageContext';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    type?: string;
    schema?: object;
}

const SEO: React.FC<SEOProps> = ({
    title,
    description,
    keywords,
    type = 'website',
    schema
}) => {
    const { t } = useLanguage();

    const siteTitle = t('navbar.companyName') || 'شركة عقاب السحيمي';
    const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
    const defaultDesc = description || t('footer.companyDesc');

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={defaultDesc} />
            {keywords && <meta name="keywords" content={keywords} />}

            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={defaultDesc} />
            <meta property="og:type" content={type} />

            {schema && (
                <script type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            )}
        </Helmet>
    );
};

export default SEO;
