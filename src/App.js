import Header from "./components/Header";
import { BsQuestionCircle } from "react-icons/bs";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <div className="flex m-auto py-24 w-[1000px] flex-col">
        <div className="flex items-center mb-2">
          <span className="font-medium">라방 랭킹</span>
          <BsQuestionCircle className="ml-2" />
        </div>
        <span className=" mb-4 text-sm text-gray-400">
          72시간 동안 가장 매출액 높은 라이브방송
        </span>
        <div className="w-full overflow-x-auto">
          <div className="overflow-hidden min-w-max">
            <div className="grid grid-cols-7 p-4 text-sm font-medium text-gray-900 border-t border-b-2 border-gray-200 gap-x-8 border-solid ">
              <div className="flex items-center justify-center">방송정보</div>
              <div className="flex items-center justify-center">분류</div>
              <div className="flex items-center justify-center">방송시간 </div>
              <div className="flex items-center justify-center">조회수</div>
              <div className="flex justify-center items-center">
                <div>판매량</div>
                <BsQuestionCircle
                  className="ml-1"
                  data-popover-target="popover-default"
                />
              </div>
              <div className="flex justify-center items-center">
                <div>매출액</div>
                <BsQuestionCircle className="ml-1" />
              </div>
              <div className="flex items-center justify-center">상품수</div>
            </div>
            <div className="grid grid-cols-7 px-4 py-5 text-sm text-gray-700 border-b border-gray-200 gap-x-8 dark:border-gray-700">
              <div className="text-gray-500 dark:text-gray-400 text-center">
                1. 안녕
              </div>
              <div className="text-gray-500 dark:text-gray-400 text-center">
                잘가
              </div>
              <div className="text-gray-500 dark:text-gray-400 text-center">
                배고파
              </div>
              <div className="text-gray-500 dark:text-gray-400 text-center">
                메롱
              </div>
              <div className="text-gray-500 dark:text-gray-400 text-center">
                하하하
              </div>
              <div className="text-gray-500 dark:text-gray-400 text-center">
                키키
              </div>
              <div className="text-gray-500 dark:text-gray-400 text-center">
                짱구
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
