module.exports.buildEntityIdentifierFile = ({
    uppercasePlural,
    uppercaseSingular,
    lowercasePlural,
    lowercaseSingular,
}) => {
    return `import { useRouter } from "next/router";
import { GetStaticProps, GetStaticPaths } from "next";

import RenderComponents from "../../components/__cms/RenderComponents";

const ${uppercaseSingular} = ({ ${lowercaseSingular}Data }: any) => {
    const router = useRouter();

    if (router.isFallback) {
        return <div style={{ padding: "150px" }}>Loading...</div>;
    }

    const ${lowercaseSingular} = ${lowercaseSingular}Data?.data[0];

    return (
        <div>
            <RenderComponents cmsData={${lowercaseSingular}?.cms_data} />
        </div>
    );
};

export default ${uppercaseSingular};

export const getStaticPaths: GetStaticPaths = async () => {
    // Get the paths we want to pre-render based on users
    // const paths = sampleUserData.map((user) => ({
    //   params: { id: user.id.toString() },
    // }))

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return {
        paths: [],
        fallback: true,
    };
};

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export const getStaticProps: GetStaticProps = async ({ params }) => {
    if (!params)
        return {
            notFound: true,
        };

    const identifier = params.identifier;

    try {
        //Fetch ${uppercaseSingular} Data
        const ${lowercaseSingular}Req = await fetch(
            \`\${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/${lowercasePlural}/\${identifier}\`
        );

        const ${lowercaseSingular}Data = await ${lowercaseSingular}Req.json();

        if (!${lowercaseSingular}Data.success) {
            return {
                notFound: true,
            };
        }

        return {
            props: {
                ${lowercaseSingular}Data: ${lowercaseSingular}Data,
            },
            // Next.js will attempt to re-generate the ${lowercaseSingular}:
            // - When a request comes in
            // - At most once every second
            revalidate: 30, // In seconds
        };
    } catch (err) {
        console.log(err);
        return {
            notFound: true,
        };
    }
};`;
};
