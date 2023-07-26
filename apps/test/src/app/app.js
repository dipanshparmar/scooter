import { ScooterCore } from "@factly/scooter-core";
import React, { useState, useEffect } from "react";
import { SSE } from "sse";
import axios from "axios";
export function App() {
  //<div data-type='embed' class='embed-wrapper'><div style='left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.5%;'><iframe src='https://www.youtube.com/embed/7OO5uGvNZpM?feature=oembed' style='border: 0; top: 0; left: 0; width: 100%; height: 100%; position: absolute;' allowfullscreen='' scrolling='no' allow='encrypted-media; accelerometer; clipboard-write; gyroscope; picture-in-picture'></iframe></div></div><p>hello</p><img src='https://pbs.twimg.com/media/FqAnDvEWAAIXd6l?format=jpg&name=medium' style='background: red;' /><ol class='yo'><li>1.</li><li>hello</li><li>hello</li></ol>
  const [value, setValue] = useState(
    ` 
    <p></p>
   `
    // <tagore-component>hello</tagore-component>`
    //<table><tbody > <tr class='classsss'>  <th>Name</th>  <th colspan='3'>Description</th> </tr> <tr> <td>Cyndi Lauper</td>      <td>singer</td>    <td>songwriter</td>    <td>actress</td>   </tr></tbody></table>  "
  );

  return (
    <>
      <h1 className="">Scooter demo</h1>
      <ScooterCore
        initialValue={value}
        menuType="bubble"
        heightStrategy="flexible"
        rows={20}
        onChange={data => {
          setValue(data.html);
        }}
        editorInstance={editor => {
          const { from, to } = editor.state.selection;
          console.log(editor.state.selection);
          console.log("const { from, to } = this.editor.state.selection;" , from , to);
          return;
        }}
       meta = {{
        claims: {
          1: { id: 1, claim: "Claim 1", fact: "Fact 1" },
          2: { id: 2, claim: "Claim 2", fact: "Fact 2" },
          3: { id: 3, claim: "Claim 3", fact: "Fact 3" },
          4: { id: 4, claim: "Claim 4", fact: "Fact 4" }
        }
      }
       }
        tagoreConfig={{
          stream: true,
          sse: (input, selectedOption) => {
            let source = new SSE("http://localhost:8080/prompts/generate", {
              headers: {
                "X-User": "20",
                //  max_tokens: 2000
              },
              method: "POST",
              payload: JSON.stringify({
                input: input,
                generate_for: selectedOption,
                provider: "openai",
                stream: true,
                model: "text-davinci-003", //"gpt-3.5-turbo",
                additional_instructions:
                  "The generated text should be valid html body tags(IMPORTANT). Avoid other tags like <html>, <body>. avoid using newlines in the generated text.",
                max_tokens: 2000,
              }),
            });

            return source;
          },

          fetcher: async (input, selectedOption) => {
            const response = await axios.post(
              `http://localhost:8080/prompts/generate`,
              {
                input: input,
                generate_for: selectedOption,
                provider: "openai",
                stream: false,
                model: "gpt-3.5-turbo",
                additional_instructions:
                  "The generated text should be valid html body tags(IMPORTANT). Avoid other tags like <html>, <body>. avoid using newlines in the generated text.",
              },
              { headers: { "X-User": "20" } }
            );
            // ${systemPrompt}
            const data = response.data;
            return data;
          },
          menuItems: {},
        }}
        // uploadEndpoint={window.REACT_APP_COMPANION_URL}
        // iframelyEndpoint={window.REACT_APP_IFRAMELY_URL}
        // imagesFetcher={currentPage =>
        //   axios
        //     .get(MEDIA_API, {
        //       params: { page: currentPage, limit: 12 },
        //     })
        //     .then(res => res.data)
        // }
        // onFileAdded={file => {
        //   const data = file.data;
        //   const url = data.thumbnail
        //     ? data.thumbnail
        //     : URL.createObjectURL(data);
        //   const image = new Image();
        //   image.src = url;
        //   image.onload = () => {
        //     // uppy.setFileMeta(file.id, { width: image.width, height: image.height });
        //     URL.revokeObjectURL(url);
        //   };
        //   image.onerror = () => {
        //     URL.revokeObjectURL(url);
        //   };
        // }}
        // onUploadComplete={result => {
        //   const successful = result.successful[0];
        //   const { meta } = successful;
        //   const upload = {};
        //   upload["alt_text"] = meta.caption;
        //   upload["caption"] = meta.caption;
        //   upload["description"] = meta.caption;
        //   upload["dimensions"] = `${meta.width}x${meta.height}`;
        //   upload["file_size"] = successful.size;
        //   upload["name"] = successful.fileName;
        //   upload["slug"] = successful.response.body.key;
        //   upload["title"] = meta.caption ? meta.caption : " ";
        //   upload["type"] = successful.meta.type;
        //   upload["url"] = {};
        //   upload["url"]["raw"] = successful.uploadURL;

        //   axios.post(MEDIA_API, [upload]).catch(error => {
        //     console.error(error);
        //   });
        // }}
        // uploadConfig={{
        //   restrictions: {
        //     maxFileSize: 5242880,
        //     allowedFileTypes: [".jpg", ".jpeg", ".png", ".gif"],
        //   },
        //   onBeforeUpload: files => {
        //     const updatedFiles = {};

        //     Object.keys(files).forEach(fileID => {
        //       updatedFiles[fileID] = {
        //         ...files[fileID],
        //         fileName: files[fileID].meta.name,
        //         meta: {
        //           ...files[fileID].meta,
        //           name:
        //             space_slug +
        //             "/" +
        //             new Date().getFullYear() +
        //             "/" +
        //             new Date().getMonth() +
        //             "/" +
        //             Date.now().toString() +
        //             "_" +
        //             files[fileID].meta.name,
        //         },
        //       };
        //     });
        //     return updatedFiles;
        //   },
        // }}
      />

      {value.toString()}
    </>
  );
}
export default App;
if (import.meta.vitest) {
  // add tests related to your file here
  // For more information please visit the Vitest docs site here: https://vitest.dev/guide/in-source.html
  const { it, expect, beforeEach } = import.meta.vitest;
  let render;
  beforeEach(async () => {
    render = (await import("@testing-library/react")).render;
  });
  it("should render successfully", () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toBeTruthy();
  });
  it("should have a greeting as the title", () => {
    const { getByText } = render(<App />);
    expect(getByText(/Welcome test/gi)).toBeTruthy();
  });
}
