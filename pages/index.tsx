import EditorJsRenderer from "@/components/EditorJsRenderer";
import Header from "@/components/atom/Header";
import { OutputBlockData, OutputData } from "@editorjs/editorjs";
import Head from "next/head";
import React, { FormEvent, useState } from "react";

const initialData: OutputData = {
  time: 1664631046512,
  blocks: [
    {
      id: "i1HDCAxqng",
      type: "code",
      data: {
        code: "#python\n\n# This program prints Hello, world!\nprint('Hello, world!')\n",
      },
    },
    {
      id: "S_oEvbfKfl",
      type: "code",
      data: {
        code: "#css\n\nhtml,\nbody {\n  padding: 0;\n  margin: 0;\n  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,\n    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;\n}\n\n",
      },
    },
  ],
  version: "2.25.0",
};

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<OutputData>(initialData);

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
      <main className="w-screen h-screen flex flex-col">
        <Header />
        <div className="bg-grey-100 p-10 flex flex-grow space-x-5">
          <div className="h-full w-1/2 p-7.5 bg-SystemlightBlue rounded-default flex flex-col">
            <h1 className="text-large font-bold mb-7.5">Request</h1>
            <form
              onSubmit={(e) => handleSubmit(e)}
              className="flex-grow flex flex-col"
            >
              <div className="bg-primary rounded-default py-4 px-5 mb-2.5">
                <label htmlFor="language">언어 선택</label>
                <select id="language">
                  <option value="javascript">JavaScript</option>
                  <option value="react">React</option>
                  <option value="vue">Vue</option>
                  <option value="nextjs">Next.js</option>
                </select>
              </div>
              <div className="bg-grey-100 rounded-default flex-grow flex flex-col">
                <div className="py-4 px-5 flex-grow">
                  <input
                    type="text"
                    name="fcn"
                    id="fcn"
                    placeholder="a + b의 합을 반환하는 함수"
                  />
                </div>
                <div className="py-4 px-5 bg-grey-200 rounded-br-default rounded-bl-default">
                  <button type="submit">코드 생성</button>
                </div>
              </div>
            </form>
          </div>
          <div className="w-1/2 h-full p-7.5 bg-SystemlightBlue rounded-default">
            <h1 className="text-large font-bold mb-7.5">Response</h1>
            {loading && <div className="text-white">Please wait...</div>}
            <EditorJsRenderer data={data} />
          </div>
        </div>
      </main>
    </>
  );
}
