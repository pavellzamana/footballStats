import React from "react";
import preloader from "../../../assets/images/preloader.gif";

const Preloader: React.FC = () => {
    return <div>
        <img src={preloader} alt={'loading'}/>
    </div>
}

export default Preloader;