import logo from './logo.svg';
import './App.css';
import Home from './components/common/home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserRegistration from './components/common/userRegistration';
import EmailVerification from './components/common/emailVerification';
import UserHome from './components/user/userHome';
import EditProfile from './components/user/editProfile';
import CreateGroup from './components/user/createGroup';
import ViewGroups from './components/user/viewGroups';
import SendGroupInvitation from './components/user/sendGroupInvitation';
import ViewGroupMembers from './components/user/viewGroupMembers';
import GroupInvites from './components/user/groupInvites';
import ViewInvitedGroups from './components/user/viewInvitedGroups';
import Logout from './Logout';
import Tasks from './components/user/tasks';
import CreateTask from './components/user/createTask';
import TaskDetails from './components/user/taskDetails';
import ViewTask from './components/user/viewTask';
import UpdateTaskCompletion from './components/user/updateTaskCompletion';
import ChatNow from './components/user/chatNow';
import GroupChat from './components/user/groupChat';
import EditProfileImage from './components/user/editProfileImage';
import RaiseBug from './components/user/raiseBug';
import GroupTasks from './components/user/groupTasks';
function App() {
  
  return (
    <BrowserRouter>
    <div className="App">
       <Routes>
        <Route path='/'  Component={Home} />
        <Route path='/userRegistration'  Component={UserRegistration} />
        <Route path='/emailVerification'  Component={EmailVerification} />
        <Route path='/userHome'  Component={UserHome} />
        <Route path='/editProfile'  Component={EditProfile} />
        <Route path='/createGroup'  Component={CreateGroup} />
        <Route path='/viewGroups'  Component={ViewGroups} />
        <Route path='/sendGroupInvitation'  Component={SendGroupInvitation} />
        <Route path='/viewGroupMembers'  Component={ViewGroupMembers} />
        <Route path='/groupInvites'  Component={GroupInvites} />
        <Route path='/viewInvitedGroups'  Component={ViewInvitedGroups} />
        <Route path='/logout'  Component={Logout} />
        <Route path='/tasks'  Component={Tasks} />
        <Route path='/createTask'  Component={CreateTask} />
        <Route path='/taskDetails'  Component={TaskDetails} />
        <Route path='/viewTask'  Component={ViewTask} />
        <Route path='/updateTaskCompletion'  Component={UpdateTaskCompletion} />
        <Route path='/chatNow'  Component={ChatNow} />
        <Route path='/groupChat'  Component={GroupChat} />
        <Route path='/editProfileImage'  Component={EditProfileImage} />
        <Route path='/raiseBug'  Component={RaiseBug} />
        <Route path='/groupTasks'  Component={GroupTasks} />

        
       </Routes>
      </div>
      </BrowserRouter>
  );
}

export default App;
