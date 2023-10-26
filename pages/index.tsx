import Head from "next/head";
import Layout, { siteTitle } from "../components/Layout";
import utilStyles from "../styles/utils.module.css";
import { PostData, getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/Date";
import { InferGetStaticPropsType } from "next";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({
  allPostsData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          I am a Software Engineer with four years of experience in the tech
          industry, primarily focused on Frontend Engineering. Over time, I've
          expanded my skill set to include cloud-based development using
          serverless architecture and nestjs, which has transformed me into a
          proficient Fullstack Engineering. I thrive on tackling complex
          projects as they drive me to continuously learn and enhance my
          abilities. My collaborative nature and commitment make me an excellent
          team contributor.
        </p>
        <p>
          (This is a sample website - you’ll be building a site like this on{" "}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData?.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                {date && <Date dateString={date} />}
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
