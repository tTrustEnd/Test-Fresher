import React,{ useEffect, useState } from "react";
import { StatisticAX } from "../../../service/api";
import { Button, Col, Row, Statistic } from 'antd';
import CountUp from "react-countup";
const Dashboard = () =>{
    const [totalUsers,setTotalUsers] = useState();
    const [totalOrder,setTotalOrder] = useState();
    
    const getStatistic = async() =>{
        let statistic = await StatisticAX();
        console.log('statistic',statistic)
        setTotalUsers(statistic.data.countUser)
        setTotalOrder(statistic.data.countOrder)
    }
    const formatter = (value) => <CountUp end={value} separator="," />;
    useEffect(()=>{
        getStatistic()
    },[])
    return (<><div  style={{display:'flex',width:1000}}>

<Row gutter={16}>
    <div> 
    <Col  style={{width:600}}>
      <Statistic title="Số khách hàng" value={totalUsers} formatter={formatter}  />
    </Col>
    </div>
  <div>
  <Col >
      <Statistic 
      title="Đơn hàng" value={totalOrder}   formatter={formatter}  />
    </Col>
  </div>
  
  </Row>
    </div>
  
    </>)
}
export default Dashboard;