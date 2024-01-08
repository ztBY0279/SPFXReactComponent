import* as React from "react";
//import sliderStyle from "./styles/Slider.module.scss";

function NewSlider():React.ReactElement<HTMLDivElement>{
  //alert("new slider is called:");
    // function plusSlides():void{
    //     console.log("hello");
    // }
    // function currentSlide():void{
    //     console.log("hello");
    // }
    return (
        
         <div>
            <p>hello from New Slider Component:</p>
         </div>
         
    )
}

export default NewSlider;

/* <div className={sliderStyle.slideshowContainer}>
<div className={`${sliderStyle.mySlides} ${sliderStyle.fade}`}>
  <div className={sliderStyle.numbertext}>1 / 3</div>
  <p>here is image givne below</p>
  <img
    
    src="https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630"
    style={{ width: "100%" }}
  />
  <div className={sliderStyle.text}>Caption Text</div>
</div>


</div> */

 /* <br />

          <div style={{ textAlign: "center" }}>
            <button className={sliderStyle.dot} onClick={currentSlide}>
              1
            </button>
            <button className={sliderStyle.dot} onClick={currentSlide}>
              2
            </button>
            <button className={sliderStyle.dot} onClick={currentSlide}>
              3
            </button>
          </div> */
        