import React, { useState } from "react";
import { Button, Drawer, Radio, Space } from "antd";
import { Badge, Descriptions } from 'antd';

const ModalDetaiUser = (props) => {
    const {dataUserDetail,isShowModalDetailUser,onClose} = props;
    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState("right");
    return (
        <>
        <Space>
        </Space>
        <Drawer
          title="Thông tin người dùng " 
          placement={placement}
          width={850}
          onClose={onClose}
          open={isShowModalDetailUser}
          size='default'
          extra={
            <Space>
              <Button type="primary" onClick={onClose}>
                OK
              </Button>
            </Space>
          }
        >
         <Descriptions column={2}  bordered>
    <Descriptions.Item label="_id:">{dataUserDetail._id}</Descriptions.Item>
    <Descriptions.Item label=" fullName:" >{dataUserDetail.fullName}</Descriptions.Item>
    <Descriptions.Item label="email:" >{dataUserDetail.email}</Descriptions.Item>
    <Descriptions.Item label="phone:">{dataUserDetail.phone}</Descriptions.Item>
    <Descriptions.Item label="role:" span={2}   >
    <Badge status="processing"  />  {dataUserDetail.role}
    </Descriptions.Item>

    <Descriptions.Item label=" updatedAt:">{dataUserDetail.updatedAt}</Descriptions.Item>
    <Descriptions.Item label="avatar:">{dataUserDetail.avatar}</Descriptions.Item>
   
  </Descriptions>
         
        </Drawer>
      </>
    )
}
export default ModalDetaiUser;