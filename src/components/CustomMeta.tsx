import { Helmet } from "react-helmet";

interface CustomMetaProps {
  title: string;
  description: string;
  themeColor?: string;
}

function CustomMeta({ title, description, themeColor }: CustomMetaProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta name="twitter:title" content={title} />
      <meta name="description" content={description} />
      <meta property="og:description" content={description} />
      <meta name="twitter:description" content={description} />
      {themeColor && <meta name="theme-color" content={themeColor} />}
    </Helmet>
  );
}

export default CustomMeta;
