import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "../App.css";
import Select from "react-select";
import { BsStars } from "react-icons/bs";
import { DiCodeigniter } from "react-icons/di";
import Editor from "@monaco-editor/react";
import { IoCopy } from "react-icons/io5";
import { FaFileExport } from "react-icons/fa6";
import { MdOpenInNew } from "react-icons/md";
import { LuRefreshCcw } from "react-icons/lu";
import { GoogleGenAI } from "@google/genai";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { IoMdCloseCircle } from "react-icons/io";


const Home = () => {
  const options = [
    { value: "html-css", label: "HTML+CSS" },
    { value: "html-tailwind", label: "HTML + TailwindCSS" },
    { value: "html-bootstrap", label: "HTML + Bootstrap" },
    { value: "html-css-js", label: "HTML + CSS + JS" },
    { value: "html-tailwind-bootstrap", label: "HTML + Tailwind + Bootstrap" },
  ];

  const [outputScreen, setOutputScreen] = useState(false);
  const [tab, setTab] = useState(1);
  const[prompt,setPrompt]=useState("");
  const[framework,setFramework]=useState(options);
  const[code,setCode]=useState("");
  const[loading,setLoading]=useState(false);
  const[isNewTabOpen,setIsNewTabOpen]=useState(false);



// function extractCode(response){
//   // remove content inside backticks using regex.
//   const match = response.match(/```(?:\w+)?\n?([\s\S]*?)```/);
//   return match ? match[1].trim() : response.trim();
// }
  function extractCode(responseText) {
  const match = responseText.match(/``````/);
  return match ? match[1].trim() : responseText.trim();
}




  // The client gets the API key from the environment variable `GEMINI_API_KEY`.
  const ai = new GoogleGenAI({
    apiKey: " AIzaSyA2koVOKCyIhkrcrwIaaYFCAQBQMrLMyQ4",
  });

  async function getResponse() {
    setLoading(true);
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents:
      `You are an experienced programmer with expertise in web development and UI/UX design.You create modern,animated,and fully responsive UI components.You are highly skilled in HTML,CSS,Tailwind CSS ,Bootstrap,JavaScript,React,Next.js,Vue.js,Angular and more
      
Now, generate a UI component for: ${prompt}  
Framework to use: ${framework.value}  

Requirements:  
The code must be clean, well-structured, and easy to understand.  
Optimize for SEO where applicable.  
Focus on creating a modern, animated, and responsive UI design.  
Include high-quality hover effects, shadows, animations, colors, and typography.  
Return ONLY the code, formatted properly in **Markdown fenced code blocks**.  
Do NOT include explanations, text, comments, or anything else besides the code.  
And give the whole code in a single HTML file.`,
    });
    console.log(response.text);
    setCode(extractCode(response.text));
    setOutputScreen(true);
    setLoading(false);
  }

  const copyCode = async ()=>{
     try {
      await navigator.clipboard.writeText(code);
      toast.success("Code copied successfully!!");
    } catch (err) {
      console.error('Failed to copy: ', err);
      toast.error("Failed to copy.")
    }
  };

  const downloadFile = () =>{
    const fileName="GenUI-Code,html"
    const blob = new Blob([code],{ type: 'text/plain'});
    let url=  url.createObjectURL(blob);
    const link=document.createElement('a');
    link.href=url;
    link.download=fileName;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("File downloaded!!");
  }



  return (
    <>
      <Navbar />
      <div className="flex items-center px-[100px] justify-between gap-[30px]">
        <div className="left w-[49%] h-[auto] bg-[#141319] mt-6 px-[20px] py-[5px] rounded-xl">
          <h3 className="text-[25px] font-semibold gradient-text mt-5 ">
            AI Code Generator
          </h3>
          <p className="text-[gray] mt-2 text-[15px] ">
            Describe your component and let AI curate it
          </p>
          <p className="text-[15px] font-[600] mt-3">FrameWork</p>
          <Select
            className="mt-2"
            options={options}
            theme={(theme) => ({
              ...theme,
              borderRadius: 8,
              colors: {
                ...theme.colors,
                primary25: "#1a1a1a",
                primary: "#333",
                neutral0: "#0f0f0f", // background
                neutral80: "#ffffff", // text
                neutral20: "#333", // border
              },
            })}
            styles={{
              control: (base) => ({
                ...base,
                backgroundColor: "#0f0f0f",
                borderColor: "#333",
                color: "#fff",
              }),
              menu: (base) => ({
                ...base,
                backgroundColor: "#0f0f0f",
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isFocused ? "#1a1a1a" : "#0f0f0f",
                color: "#fff",
              }),
              singleValue: (base) => ({
                ...base,
                color: "#fff",
              }),
              
            }}
            onChange={(e)=>{
              setFramework(e.value);
            }}
          />
          <p className="text-[15px] font-[600] mt-3">Describe your component</p>
          <textarea onChange={(e)=>{setPrompt(e.target.value)}} value={prompt}
            className="w-full min-h-[200px] rounded-xl bg-[#0f0f0f] p-[10px] mt-2"
            placeholder="Describe your component in detail and let AI code for you."
          ></textarea>
          <div className="flex items-center justify-between">
            <p className="text-[gray]">
              Click on generate button to generate your code.
            </p>
            <button onClick={getResponse} className="generate flex items-center p-[5px] rounded-lg border-0 cursor-pointer bg-gradient-to-r from-blue-300  to-blue-800 mt-3 px-[15px] gap-[10px] transition-all hover:opacity-[.8] ">
            {
              loading === false ?
              <>
                <i> <BsStars /> </i>
              </>:" "
              
            }
              
            Generate {
              loading===true ?
              <>
             
              <ClipLoader className="text-[20px]"/>
            
              </>: " "

            }{" "}
            </button>
          </div>
        </div>
        <div className="right mt-2 left w-[49%] h-[80vh] bg-[#141319] rounded-xl ">
          {outputScreen === false ? (
            <>
            
              <div className="skeleton w-full h-full flex items-center flex-col justify-center">
                <div className="circle p-[15px] w-[70px] h-[70px] rounded-[50%] flex items-center justify-center text-[30px] bg-gradient-to-r from-blue-300  to-blue-800 ">
                  <DiCodeigniter />
                </div>
                <p className="text-[15px] text-[gray] mt-3">
                  Your code will appear here..
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="top bg-[#17171C] w-full h-[60px]  flex items-center gap-[15px] px-[20px]">
                <button
                  onClick={() => {
                    setTab(1);
                  }}
                  className={`btn w-[50%] p-[7px] bg-blue-450 rounded-xl cursor-pointer transition-all ${
                    tab === 1 ? " bg-[#333]" : " "
                  }`}
                >
                  Code
                </button>
                <button
                  onClick={() => {
                    setTab(2);
                  }}
                  className={`btn w-[50%] p-[7px] bg-blue-450 rounded-xl cursor-pointer transition-all ${
                    tab === 2 ? " bg-[#333]" : " "
                  }`}
                >
                  Preview
                </button>
              </div>
              <div className="top-2 bg-[#17171C] w-full h-[60px]  flex items-center justify-between gap-[15px] px-[15px] ">
                <div className="left">
                  <p className="font-bold">Code Editor</p>
                </div>
                <div className="right flex items-center gap-[10px]">
                  {tab === 1 ? (
                    <>
                      <button className="copy w-[35px] h-[35px] flex items-center justify-center rounded-xl border-[1px] border-zinc-600 transition-all hover:bg-[#333]" onClick={copyCode}>
                        <IoCopy />
                      </button>
                      <button className="export w-[35px] h-[35px] flex items-center justify-center  rounded-xl border-[1px] border-zinc-600 transition-all hover:bg-[#333]">
                        <FaFileExport />
                      </button>
                    </>
                  ) : (
                    <>
                      {" "}
                      <button className="copy w-[35px] h-[35px] flex items-center justify-center rounded-xl border-[1px] border-zinc-600 transition-all hover:bg-[#333]" onClick={setIsNewTabOpen(true)}>
                        <MdOpenInNew />
                      </button>
                      <button className="export w-[35px] h-[35px] flex items-center justify-center  rounded-xl border-[1px] border-zinc-600 transition-all hover:bg-[#333]" onClick={downloadFile}
                        ><LuRefreshCcw />
                      </button>
                    </>
                  )}
                </div>
              </div>
              <div className="editor h-full ">
                {tab === 1 ? (
                  <>
                    <Editor
                      value={code}
                      height="100%"
                      theme="vs-dark"
                      language="html"
                    />
                    ;
                  </>
                ) : (
                  <>
                 
                    <iframe  srcDoc={code} className="preview bg-white text-black w-full h-full flex items-center justify-center"></iframe>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>

    {
      isNewTabOpen===true?
      <>
      <div className="close absolute top-[100px] right-[100px] w-[50px] h-[50px] rounded-[50%] flex items-center justify-center bg-[#333] cursor-pointer" >
        <div className="top w-full h-[60px] flex items-center justify-between px-[20px]">
          <div className="left">
            <p className="font-bold">Preview</p>
          </div>
          <div className="right flex items-center gap-[10px]">
             <button className="copy w-[40px] h-[40px] rounded-xl border-[1px] border-zinc-800 flex-items-center justify-center transition-all hover:bg-[#333]" onClick={()=>{setIsNewTabOpen(false)}}><IoMdCloseCircle /></button>
          </div>
        </div>
        

       <iframe srcDoc={code} className="w-full h-full"></iframe>
       </div>
      </>: ""
    }

    </>
  );
};

export default Home;
