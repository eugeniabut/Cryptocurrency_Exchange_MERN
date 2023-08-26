//file upload step 1.
import FileBase from "react-file-base64"

function MyProfileForme() {
  const { profileData, setProfileData, userId } = useContext(StorContext);

  const [editingField, setEditingField] = useState("");
  const [file, setFile] = useState();
  const [description, setDescription] = useState("");
  const [avatar, setAvatar] = useState("");

  //create locale state. Step 2.
  const [postData, setPostData] = useState({
    avatar: ""
  })


//create a submit function. Step 3.

const handelSubmitTemp = async (e)=>{
  e.preventDefault();
  //next post data to the Backend
  
try {

  const API = axios.create({ baseURL: "http://localhost:4000" });

  API.interceptors.request.use((req) => {
    if (localStorage.getItem("my-app-token")) {
      req.headers.authorization = `Bearer ${
        JSON.parse(localStorage.getItem("my-app-token"))
      }`;
    }
    return req;
  });

  const result = await API.post(`/users/update-profile/${userId}`, postData)

    console.log('====================================');
    console.log("Result", result);
    console.log('====================================');

} catch (error) {
  console.log('====================================');
  console.log(error.message);
  console.log('====================================');
}
}

//to display image
<form onSubmit={handelSubmitTemp}>
<div className="profile-picture">
  <FileBase
    type='file'
    multiple={false}
    onDone={({base64})=>setPostData({...postData, avatar:base64})}
  />
  <button type="submit">Submit</button>
</div>
</form>