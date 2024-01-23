//https://coolors.co/palette/f94144-f3722c-f8961e-f9844a-f9c74f-90be6d-43aa8b-4d908e-577590-277da1

export const font_family_default = `"Lucida Console", "Monaco", monospace`;
export const border_default = `0.1rem solid black`;
export const border_radius_default = `0.5rem`;
export const backendServerAddress = "https://localhost:7260/";

let favicon = document.createElement("link");
favicon.setAttribute("rel","icon");
favicon.setAttribute("type","image/x-icon");
favicon.setAttribute("href","/static/imagini/logo.ico");

document.head.appendChild(favicon);//set favicon to page