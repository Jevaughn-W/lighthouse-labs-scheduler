import React from "react";

import "components/Button.scss";

export default function Button(props) {
   
   // Logic to check which class was passed to the button via props

   let buttonClass = "button";

   if (props.confirm) {
     buttonClass += " button--confirm";
   } 
   
   if (props.danger) {
      buttonClass += " button--danger";
   }

   return (
      <button 
         className={buttonClass}
         onClick={props.onClick}
         disabled={props.disabled}
      >
         {props.children}
      </button>
   ); 
}
