import Header from "./components/Header";
import { BsQuestionCircle } from "react-icons/bs";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import "react-tippy/dist/tippy.css";
import { Tooltip } from "react-tippy";
import makeTime from "./utils/time";
import findPlatform from "./utils/platform";

function App() {
  const [items, setItems] = useState([]);
  const [types, setTypes] = useState([]);
  let maxitems = [];
  useEffect(() => {
    axios({
      method: "get", // 통신 방식
      url: "/data", // 서버
    })
      .then(({ data }) => {
        setItems(data);
      })
      .catch((error) => {
        console.error(error);
      });

    axios({
      method: "post",
      url: "https://datalab.labangba.com/home/gnb",
      headers: { "Content-Type": "application/json" },
    })
      .then(({ data }) => {
        setTypes(data.cats);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const typeChange = (item) => {
    let arr = [];
    let name;

    Object.entries(types).forEach((type) => {
      const key = type[0];
      const value = type[1];

      if (item === +key) arr = [...arr, value.pid];
    });

    Object.entries(types).forEach((type) => {
      const key = type[0];
      const value = type[1];

      if (arr[0] === +key) name = value.name;
    });

    return name;
  };

  const modifiedData =
    items &&
    items.map((item) => {
      return {
        id: typeChange(item.cid),
        date: makeTime(item.datetime_start),
        url: item.objectID,
        platform: item.platform_id,
        product: item.product_cnt,
        total_sales: item.sales_amt,
        sales: item.sales_cnt,
        title: item.title,
        view: item.visit_cnt,
      };
    });

  const MaxTotalSales = modifiedData.map((item) => item.total_sales);
  const MaxSales = modifiedData.map((item) => item.sales);
  const MaxViews = modifiedData.map((item) => item.view);

  maxitems.push(
    Math.max(...MaxTotalSales),
    Math.max(...MaxSales),
    Math.max(...MaxViews)
  );

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
            <div className="flex p-4 text-sm font-medium text-gray-900 border-t border-b-2 border-gray-200 border-solid ">
              <div className="flex items-center justify-center w-4%"></div>
              <div className="flex items-center justify-center w-31%">
                방송정보
              </div>
              <div className="flex items-center justify-center w-12%">분류</div>
              <div className="flex items-center justify-center w-12%">
                방송시간{" "}
              </div>
              <div className="flex items-center justify-center w-10%">
                조회수
              </div>
              <div className="flex justify-center items-center w-10%">
                <div>판매량</div>
                <Tooltip
                  title="판매량"
                  position="right"
                  trigger="mouseenter"
                  animation="scale"
                >
                  <BsQuestionCircle
                    className="ml-1"
                    data-popover-target="popover-default"
                  />
                </Tooltip>
              </div>
              <div className="flex justify-center items-center w-13%">
                <div>매출액</div>
                <Tooltip
                  title="매출액"
                  position="right"
                  trigger="mouseenter"
                  animation="scale"
                >
                  <BsQuestionCircle className="ml-1" />
                </Tooltip>
              </div>
              <div className="flex items-center justify-center w-8%">
                상품수
              </div>
            </div>
            {modifiedData.map((item, index) => {
              return (
                <div
                  key={index}
                  className=" flex text-sm text-gray-700 border-b border-gray-100  h-14 items-center border-solid"
                >
                  <div className="w-4% text-orange-400 py-0 px-2 font-bold">
                    {index + 1}
                  </div>
                  <div
                    className="flex flex-col justify-center  py-0 px-2 w-31% truncate hover:cursor-pointer"
                    onClick={() =>
                      window.open(
                        `https://datalab.labangba.com/report/labang/${item.url}`
                      )
                    }
                  >
                    <span className="text-base font-medium text-black">
                      {item.title}
                    </span>
                    <span className=" text-gray-400 text-base font-normal">
                      {findPlatform(item.platform)}
                    </span>
                  </div>
                  <div className="text-black text-base font-normal py-0 px-2 text-center w-12%">
                    {item.id}
                  </div>
                  <div className=" py-0 px-2 text-center w-12% flex items-center flex-col justify-center">
                    <span className="text-black text-base font-normal leading-5">
                      {item.date.slice(0, 10)}
                    </span>
                    <span className="text-base font-normal text-gray-500">
                      {item.date.slice(11)}
                    </span>
                  </div>

                  <span className=" pr-4 text-right relative w-10% text-black text-base font-normal">
                    <div className="py-0 px-2 text-center absolute -z-10 right-2 w-20">
                      <div
                        className={`w-${
                          Math.floor((item.view * 100) / maxitems[2]) !== 100
                            ? Math.floor((item.view * 100) / maxitems[2]) + "%"
                            : "full"
                        } bg-amber-100 absolute rounded -z-10 left-0 h-7 top-[-5px]`}
                      />
                    </div>
                    {item.view / 10000 >= 1
                      ? `${parseFloat((item.view / 10000).toFixed(1))}만`
                      : item.view.toLocaleString()}
                  </span>
                  <span className=" pr-4 text-right relative w-10% text-black text-base font-normal">
                    <div className="py-0 px-2 text-center absolute -z-10 right-2 w-20">
                      <div
                        className={`w-${
                          Math.floor((item.sales * 100) / maxitems[1]) !== 100
                            ? Math.floor((item.sales * 100) / maxitems[1]) + "%"
                            : "full"
                        } bg-amber-100 absolute rounded -z-10 left-0 h-7 top-[-5px]`}
                      />
                    </div>

                    {item.sales.toLocaleString()}
                  </span>
                  <span className=" pr-4 text-right relative w-10% text-black text-base font-normal">
                    <div className="py-0 px-2 text-center absolute -z-10 right-2 w-20">
                      <div
                        className={`w-${
                          Math.floor((item.total_sales * 100) / maxitems[0]) !==
                          100
                            ? Math.floor(
                                (item.total_sales * 100) / maxitems[0]
                              ) + "%"
                            : "full"
                        } bg-amber-100 absolute rounded -z-10 left-0 h-7 top-[-5px]`}
                      />
                    </div>
                    {`${Math.round(item.total_sales / 1000000) / 100}억`}
                  </span>
                  <div className="text-black text-base font-normal   py-0 px-2 text-center w-8%">
                    {item.product}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
