import { Col, Row } from "antd";
import React from "react"
import ContentLoader from "react-content-loader"
const Loadingview = (props) => {
    return(<>
    <Row  gutter={[20,20]}>
        <Col xxl={18} md={15} style={{border:'1px solid red'}} >
        <ContentLoader 
    width={9000}
    speed={2}
    viewBox="0 0 1800 600"
    backgroundColor="#76dbca"
    foregroundColor="#bf69ac"
    {...props}
  >
    <rect x="48" y="48" rx="3" ry="3" width="88" height="6" /> 
    <rect x="48" y="26" rx="3" ry="3" width="52" height="6" /> 
    <rect x="0" y="56" rx="3" ry="3" width="410" height="6" /> 
    <rect x="0" y="72" rx="3" ry="3" width="380" height="6" /> 
    <rect x="0" y="88" rx="3" ry="3" width="178" height="6" /> 
    <circle cx="20" cy="20" r="20" />
  </ContentLoader>
        </Col>
   
    </Row>
   
    </>)
}
export default Loadingview;