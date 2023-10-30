import Layout from "../../components/Layout";
import Head from "next/head";
import { PostData, getAllPostIds, getPostData } from "../../lib/posts";
import Date from "../../components/Date";
import utilStyles from "../../styles/utils.module.css";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params || !params.id) {
    return {
      props: {},
    };
  }
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

const Post = ({ postData }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className="text-xs">{postData.title}</h1>
        <div className={utilStyles.lightText}>
          {postData.date && <Date dateString={postData.date} />}
        </div>
        {postData.contentHtml && (
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        )}
      </article>
    </Layout>
  );
};

export default Post;
