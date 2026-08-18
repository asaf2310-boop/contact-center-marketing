import React from "react";

const fields = [
  { key: "problem", label: "הבעיה" },
  { key: "challenge", label: "האתגר" },
  { key: "solution", label: "הפתרון" },
  { key: "built", label: "מה נבנה" },
  { key: "result", label: "התוצאה" },
];

export default function CaseStudyCard({
  title,
  problem,
  challenge,
  solution,
  built,
  technologies = [],
  result,
}) {
  return (
    <article className="ai-case">
      {title ? <h3>{title}</h3> : null}
      <dl className="ai-case__fields">
        {fields.map(({ key, label }) => {
          const value = { problem, challenge, solution, built, result }[key];
          if (!value) return null;
          return (
            <div key={key} className="ai-case__row">
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          );
        })}
      </dl>
      {technologies.length > 0 ? (
        <ul className="ai-case__tags">
          {technologies.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
