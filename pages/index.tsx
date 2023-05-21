import Head from "next/head";
import { Inter } from "next/font/google";
import { ChangeEvent, FormEvent, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const form = e.currentTarget;
    const fcn = (form.elements.namedItem("fcn") as HTMLInputElement).value;
    const language = (form.elements.namedItem("language") as HTMLInputElement)
      .value;

    console.log({ fcn, language });

    const res = await fetch(
      `/api/get-ai-response?fcn=${fcn}&language=${language}`
    );
    const data = await res.json();

    console.log(data.choices[0].text);

    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>CodifyAI</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>CodifyAI - AI 코드 생성기</div>
        <div className="flex bg-custom-blue">
          <form onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="fcn">원하는 기능을 입력해주세요</label>

            <input
              type="text"
              name="fcn"
              id="fcn"
              placeholder="a + b의 합을 반환하는 함수"
            />
            <label htmlFor="language">언어 선택</label>
            <select id="language">
              <option value="javascript">JavaScript</option>
              <option value="react">React</option>
              <option value="vue">Vue</option>
              <option value="nextjs">Next.js</option>
            </select>
            <button type="submit">코드 생성</button>
          </form>

          {loading && <div className="text-white">Please wait...</div>}

          <pre>
            <code>var x = 10; var y = 20; var z = x + y;</code>
          </pre>
        </div>
      </main>
    </>
  );
}
