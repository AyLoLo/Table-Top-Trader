export type PostProp = {
    date_created: string;
    description : string;
    id : number;
    image : [
        {
        date_created : string;
        post_image_key: string;    
        }
    ];
    latitude : string;
    longitude : string;
    price : number; 
    title : string;
    user_id : number;
}