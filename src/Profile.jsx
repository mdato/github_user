import React from "react";
import { format } from "date-fns";

export default function Profile(props) {
  /*
  var ubicacion = props.homepage && props.homepage.split('https://')
  ubicacion===-1 || ubicacion===null?console.log(''):console.log(ubicacion)
  */

  var texto = props.homepage && props.homepage.search("https://");
  var sitioWeb = "";
  texto === -1
    ? (sitioWeb = "https://" + props.homepage)
    : texto === null
    ? (sitioWeb = "")
    : (sitioWeb = props.homepage);
  //console.log(texto)
  return (
    <>
      <article className="p-5 bg-white rounded-lg shadow shadow-blue-300">
        <article>
          <div>
            <h2 className="text-2xl">{props.name}</h2>

            {!props.description ? (
              <p className="bg-rose-400 py-1 px-2 text-xs text-white shadow rounded-lg inline-block">
                No description
              </p>
            ) : (
              <p className="bg-blue-400 py-1 px-2 text-xs text-white shadow rounded-lg inline-block">
                {props.description}
              </p>
            )}
          </div>
        </article>
        <div>
          <p>{props.language}</p>
          <p className="text-xs py-2">
            This repository was created at{" "}
            {format(new Date(props.created_at), "dd MMM yyyy")}.
            <br />
            Last updated at {format(new Date(props.updated_at), "dd MMM yyyy")}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between">
          <div className="twoFilas">
            <a
              href={props.html_url}
              target="_blank"
              rel="noreferrer"
              className="underline text-xs text-gray-600 hover:text-sm hover:text-blue-400 hover:no-underline"
            >
              Repo
            </a>
            <a
              href={
                props.homepage === null || props.homepage === ""
                  ? null
                  : sitioWeb
              }
              target="_blank"
              rel="noreferrer"
              className="underline text-xs text-gray-600 hover:text-sm hover:text-blue-400 hover:no-underline"
            >
              Page
            </a>
          </div>

          <ul className="text-xs py-2 text-right">
            <li>{props.stargazers_count.toLocaleString()} stars</li>
            <li>{props.watchers_count.toLocaleString()} watchers</li>
            <li className="text-xs">{props.open_issues} issues</li>
          </ul>

          <ul className="">
            {props.topics &&
              props.topics.map((topic, index) => (
                <li className="text-xs" key={index}>
                  {topic}
                </li>
              ))}
          </ul>
        </div>
      </article>
    </>
  );
}
