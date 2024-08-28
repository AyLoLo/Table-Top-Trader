import React, {useState, useEffect, ReactElement} from "react";
import { CREATE_POST_FORM_INPUTS, URL } from "../constants";
import { Input } from "./input"
import TTTUser from "../assets/TTTUser.png";
import {FormProvider, useForm} from "react-hook-form"

export const Form = (props : {
    addNewPost: Function;
    updateNewPost: Function;
    handleOnChange: any;
    error: string;
}): ReactElement<any> => {
    
    const {
        addNewPost,
        updateNewPost,
        handleOnChange,
        error,
    } = props

    const methods = useForm()
    const [createPostModal, setCreatePostModal] = useState<boolean>(false)

    const hidePostModal = () => {
        setCreatePostModal(false)
    }

    return (
        <>
            <FormProvider {...methods}>
                <form className="h-3/4 w-full">
                    {error && <p className="text-red-500">{error}</p>}
                {CREATE_POST_FORM_INPUTS.map((inputItems: any) => 
                    <div className="m-3" key={inputItems.label}>
                        <Input handleOnChange={handleOnChange}  inputAttributes={inputItems}/>
                    </div>)}
                    <div className="flex items-center justify-end pt-6 border-t border-solid border-blue-200 rounded-b ">
                        <button
                            className="text-white bg-red-500 active:bg-red-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                            type="button"
                            onClick={()  => hidePostModal()}
                        >
                            Close
                        </button>
                    </div>
                </form>
            </FormProvider>
        </>
    )
}



export const addNewPost = async (e : any, currentUser : any) => {
    
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("")
    const [price, setPrice] = useState<number>(0)

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {

        switch (e.target.name) {
            case "title":
                setTitle(e.target.value);
                break;
            case "description":
                setDescription(e.target.value);
                break;
            case "price":
                setPrice(e.target.value);
                break;
            default:
                break;
        }
    }
    
    const {
        posts,
        setPosts
    } =  props

    const [currentUser, setCurrentUser] = useState(null)
    const [newPost, setNewPost] = useState({})

    const fetchCurrentSession = async () => {
        try {
            const response = await fetch(`${URL}current-session`)
            const data = await response.json();
            setCurrentUser(data.currentUser)
        } catch (error) {
        console.log(error);
        }
    };
    
    e.preventDefault()

    const newUserPost = {...newPost, 'user_id' : currentUser.user_id}

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    await fetch(`${URL}posts`, {
        method: "POST",
        body: JSON.stringify({newUserPost})
    })
    .then(response => {
        if (response.ok){
            response.json()
            .then(newUserPost => setPosts([...posts, newUserPost]))
            hidePostModal()
            return response;
        } else {
            console.log("An error has occurred")
            alert("An error has occurred")
        }
    })
}

    const updateNewPost = (e: any) => {
        setNewPost({...newPost, [e.target.id]: e.target.value})
    }

    return (
        // <div className="grid grid-cols-2 items-center">
        //     <div>
        //         <img src={TTTUser} alt="Devious One"/>
        //     </div>
        //     <div>
        //         <h1 className="font-bold text-center">Create Post</h1>
        //         <form onSubmit={(e => addNewPost(e))}>
        //             <label className="font-semibold">Title</label>
        //             <input className="p-1" onChange={updateNewPost} type="text" id="title" name="title" placeholder="I am selling..."></input>
        //             <label className="font-semibold">Price</label>
        //             <input className="p-1" onChange={updateNewPost} type="number" id="Price" name="price"></input>
        //             <label className="font-semibold">Description</label>
        //             <input className="p-1" onChange={updateNewPost} type="text" id="description" name="description" placeholder="What's this sale?"></input>
        //         </form>
        //     </div>
        // </div>
    )
