import macbookImg from "../../../assets/macbook.png";

export default function HeroMacbookMockup() {
  return (
    <div className="relative mx-auto flex w-full justify-center overflow-visible py-12">
      <div className="relative z-10">
        <div
          className="
            relative
            w-[750px]
            max-w-none
            scale-95
            lg:scale-100
            origin-center
            [transform:perspective(1800px)_rotateY(-8deg)_rotateX(3deg)]
          "
        >
          <img
            src={macbookImg}
            alt="MacBook mostrando o Natura App"
            className="relative z-10 block w-full select-none"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}
