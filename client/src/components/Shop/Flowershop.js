import React from "react";
import ContactInformation from "../ContactInformation";

export default function Flowershop() {
  return (
    <>
      <div className="shop">
        <div className="shop__roof">
          <div className="shop__curvedPlant">
            <div className="shop__curvedPlantExtension">
              <span className="shop__curvedPlantExtensionLeaves"></span>
            </div>
          </div>

          <div className="shop__roofPotFlower shop__roofPotFlower--isFirst"></div>
          <div className="shop__roofPotFlowerWrapper">
            <div className="shop__roofPotFlower shop__roofPotFlower--isSecond"></div>
          </div>
          <div className="shop__roofPotFlower shop__roofPotFlower--isThird"></div>

          <div className="shop__roofCactusShapedPlant"></div>

          <div className="shop__nameContainer">
            <span className="shop__name">Casa Verde</span>
          </div>
        </div>

        <div className="shop__front">
          <div className="shop__window">
            <aside>
              <ul className="abholungs">
                <li>
                  <b>Abholung</b>
                </li>
                <li>Mo.-Fr.: 8:00 - 18:00Uhr</li>
                <li>Sa.: 9:00 - 14:00Uhr</li>
                <li>So./Feiertage: 9:00 - 13:00Uhr</li>
              </ul>
            </aside>
            <span className="shop__windowVines--isCurve"></span>

            <span className="shop__windowVines--isStraight"></span>
          </div>
          <div className="shop__windowBottom"></div>
          <div className="shop__door">
            <div className="shop_doorInner">
              <span className="shop__doorMirrorShines"></span>
            </div>
          </div>
        </div>

        <div className="shop__floorFlowerWrapper--isFirst">
          <span className="shop__floorFlower"></span>
          <span className="shop__floorPot"></span>
        </div>

        <div className="shop__floorFlowerWrapper--isSecond">
          <span className="shop__floorFlower"></span>
          <span className="shop__floorPot"></span>
        </div>

        <div className="shop__floorPotFlower"></div>

        <div className="shop__floor"></div>
      </div>
      {/* 
<div className="links">
  <a className="link__item" href="https://codepen.io/bertdida/full/vzaOzv/" target="_blank">👨‍🌾</a>
  <a className="link__item" href="https://codepen.io/bertdida/full/jvXPVx/" target="_blank">🥩</a>
  <a className="link__item" href="https://codepen.io/bertdida/full/RYmrOB/" target="_blank">👲</a>
  <a className="link__item link__item--isActive" href="https://codepen.io/bertdida/full/gdVaPV/" target="_blank">🌺</a>
</div> */}
    </>
  );
}
