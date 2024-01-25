//https://coolors.co/palette/f94144-f3722c-f8961e-f9844a-f9c74f-90be6d-43aa8b-4d908e-577590-277da1

export const font_family_default = `"Lucida Console", "Monaco", monospace`;
export const border_default = `0.1rem solid black`;
export const border_radius_default = `0.5rem`;
export const backendServerAddress = "https://localhost:7260/";
export class CustomDate {
    constructor(dateString){
        let date = dateString.split(".");
        
        if(date.length !== 3)
        {
            this.day = 0;
            this.month = 0;
            this.Year = 0
        }
        else {
            this.day = parseInt(date[0], 10);
            this.month = parseInt(date[1], 10);
            this.year = parseInt(date[2], 10);
        }
    }

    compareTo(customDate) {
        if(this.year > customDate.year)
        {
            return 1;
        }
        else 
            if(this.year < customDate.year) 
            {
                return -1;
            }
            else 
            {
                if(this.month > customDate.month)
                {
                    return 1;
                }
                else 
                    if(this.month < customDate.month) 
                    {
                        return -1;
                    }
                    else 
                    {
                        if(this.day > customDate.day)
                        {
                            return 1;
                        }
                        else 
                            if(this.day < customDate.day) 
                            {
                                return -1;
                            }
                            else
                            {
                                return 0;
                            }
                    }
            }
    }
}

let favicon = document.createElement("link");
favicon.setAttribute("rel","icon");
favicon.setAttribute("type","image/x-icon");
favicon.setAttribute("href","/static/imagini/logo.ico");

document.head.appendChild(favicon);//set favicon to page