import React ,{useState}from "react";
import './PageStyle/Mypagechg.css'

const Mypagechg = () => {

const [choice, setChoice] = useState('--견종을 선택하세요--')

const choiceOpt = ['--견종을 선택하세요--','진도','포메라니안','골든리트리버','시츄','비숑프리제','불독','닥스훈트','비글','시바-일본','푸들','치와와','시베리안 허스키']

const options = choiceOpt.map((breed) => {
    return <option value={breed}>{breed}</option>;
})

const handleClickOpts = (e) => {
    setChoice(e.target.value)
}

    return (
        <>
        <div className="myinfo_chg_container">
            <div className="myinfo_chg_img">
                
            </div>


            <div className="myinfo_chg_input_container">
                <div className="myinfo_chg_box">
                    <label className="myinfo_chg_username">닉네임</label>
                        <input type="text" className="myinfo_chg_username_input"/><br/>
                    <label className="myinfo_chg_petname">펫 이름</label>
                        <input type="text" className="myinfo_chg_petname"></input><br/>
                    <label className="myinfo_chg_petbreef">견종</label>
                        <select onChange={handleClickOpts}>{options}</select>

                        <div className="profile_btn_container">
                            <button className="profile_chg_btn">Profile Change Button</button>
                            <button className="profile_pw_btn">Profile Change Button</button>
                        </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Mypagechg;