import { json } from "@remix-run/node";
import { NavLink, useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";
import PlusIconWhite from "~/components/Icons/PlusIcon";

import { LinkFooter } from "~/components/Buttons/LinkButton";
import Carousel from "~/components/Quest/Carousel";
import { PortableText } from "@portabletext/react";

import PortableTextComponents from  '@portabletext/types'
import { useEffect, useState } from "react";



export default function Launchpad() {
    // Select the DOM-element, so that you can replace it with content
    let PROJECT_ID = "h2rdmkp4";
    let DATASET = "production";
    let QUERY = encodeURIComponent('*[_type == "project"]');

    // Compose the URL for your project's endpoint and add the query
    let PROJECT_URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;
    let doc: any

        
    // fetch the content
    fetch(PROJECT_URL)
      .then((res) => res.json())
      .then(({ result }) => {
        // get the list element, and the first item
        let list = document.querySelector("ul");
        let firstListItem = document.querySelector("ul li");

        if (result.length > 0) {
          // remove the placeholder content
          list.removeChild(firstListItem);

          result.forEach((project) => {
            // create a list element for each animal
            let listItem = document.createElement("li");

            // add the animal name as the text content
            listItem.textContent = project?.name;

            // add the item to the list
            list.appendChild(listItem);
          });
          let pre = document.querySelector("pre");
          // add the raw data to the preformatted element
          pre.textContent = JSON.stringify(result, null, 2);
          //doc = result
        }
      })
      .catch((err) => console.error(err));

      // `components` object you'll pass to PortableText
const components = {
        block: {
        // Ex. 1: customizing common block types
        h1: ({children}) => <h1 className="text-2xl">{children}</h1>,
        blockquote: ({children}) => <blockquote className="border-l-purple-500">{children}</blockquote>,
    
        // Ex. 2: rendering custom styles
        customHeading: ({children}) => (
            <h2 className="text-lg text-primary text-purple-700">{children}</h2>
        ),
        },
    }

   

    return (
        <div className="grid grid-cols-1 mx-auto mt-4 md:mt-12 lg:mt-6 gap-y-20 ">
            
            <div className=" w-full mt-12 lg:mt-12 xl:mt-16 flex items-center justify-center">
                <div className="w-full md:w-full xl:w-9/12 mx-auto flex items-center justify-center">
                    
                    <div className=" w-full">
                        <div className="  uppercase text-center leading-none md:top-14 md:left-16 lg:top:6 lg:left-10 xl:top-16 xl:left-16 2xl:top-14 2xl:left-64">
                            <div className="font-trash font-bold text-[4.4vw] lg:text-[3vw] 2xl:text-[2.8vw]">SANITY TEST</div>
                
                        </div>
                    </div>
                    
                </div>
                
            </div>


            <div>
            <div className=" flex items-center justify-center uppercase text-center leading-none md:top-14 md:left-16 lg:top:6 lg:left-10 xl:top-16 xl:left-16 2xl:top-14 2xl:left-64 my-4">
                        <PlusIconWhite className="w-8 md:w-12"></PlusIconWhite>
                            <div className="font-trash font-bold text-lg mx-60">MINT YOUR BADGES</div>
                            <PlusIconWhite className="w-8 md:w-12"></PlusIconWhite>
                        </div>
                        
                        <div className="grid w-full  place-content-center overflow-hidden ">
                        <ul>
                            <li>Loading animals…</li>
                        </ul>
                        
                        <PortableText
                            value={doc} components={components}
                            />
                            <p>ech</p>
                        <h2>Raw data</h2>
                            <pre className="max-w-xl overflow-hidden">
                    ¯\_(ツ)_/¯
                    Your data will show up here when you've configured everything correctly
                    
                            </pre>
                        </div>
            </div>
        </div>
    )
}


