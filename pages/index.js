import Head from "next/head";
import Link from "next/link";
import { getDatabase } from "../lib/notion";
import { Text } from "./[id].js";
import styles from "../styles/Home.module.css";

export const databaseId = process.env.NOTION_DATABASE_ID;

export default function Home({ posts }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Notion Next.js blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <header className={styles.header}>
          <h1>Next.js blog powered by Notion API</h1>
          {/* <p>
            Blog powered by Notion. Thanks to <a href="https://github.com/samuelkraft/notion-blog-nextjs">Samuel Kraft</a>
          </p> */}
        </header>

        <div className={styles.grid}>
          {posts.map((post) => {
            const date = new Date(post.last_edited_time).toLocaleString(
              "en-US",
              {
                month: "short",
                day: "2-digit",
                year: "numeric",
              }
            );
            return (
              <a key={post.id} className={styles.card}>
                <h3 className={styles.postTitle}>
                  <Link href={`/${post.id}`}>
                    <a>
                      <Text text={post.properties.Name.title} />
                    </a>
                  </Link>
                </h3>

                <p className={styles.postDescription}>{post.properties.Tags.multi_select[0].name}</p>
                <Link href={`/${post.id}`}>
                  <a> Read post →</a>
                </Link>
              </a>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export const getStaticProps = async () => {
  const database = await getDatabase(databaseId);

  return {
    props: {
      posts: database,
    },
    revalidate: 1,
  };
};
