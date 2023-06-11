import { useDispatch, useSelector } from "react-redux";
import React from 'react';
import { Avatar, Button, Space, Table, Tag, message } from 'antd';
import { doReturnOrder } from "../../../redux/order/orderSlice";
import { CallUpdate, updateBook } from "../../../service/api";
const { Column, ColumnGroup } = Table;
const History = () => {
    const data = useSelector(state => state.order.cartsHistory);
    const dispatch = useDispatch();
    let datax = data.map((item, index) => {

        return {
            id:item.key,
            key: index + 1,
            totalPrice: item.price * item.quantity,
            detail: [
                item.mainText
            ],
            tags: ['Thành công'],
            dateTime: item.dateTime,
            thumbnail: item.thumbnail,
            quantity:item.quantity,
            author:item.author,
            slider:item.slider,
            price:item.price,
            sold:item.sold,
        }
    })
    const data3 = datax

    const handleReturnBuy = async(record) => {
        dispatch(doReturnOrder(record))
        await updateBook(record.id,
            {
                thumbnail:record.thumbnail,
                slider:record.slider,
                mainText:record.detail,
                author:record.author,
                price:record.price,
            
            }
            )
        message.success('Hủy đơn hàng thành công T_T')
    }
    return (
        <>  <div style={{ paddingLeft: 50 }}>
            <Table dataSource={data3}>
                <Column width={100} title="Số thứ tự" dataIndex="key" key="key" />
                <Column width={200} title="Ngày mua" dataIndex="dateTime" key="totalPrice"
                />
                <Column width={200} title="Tổng số tiền" dataIndex="totalPrice" key="totalPrice" />
                <Column
                    width={200}
                    title="Trạng thái"
                    dataIndex="tags"
                    key="tags"
                    render={(tags) => (
                        <>
                            {tags.map((tag) => (
                                <Tag color="blue" key={tag}>
                                    {tag}
                                </Tag>
                            ))}
                        </>
                    )}
                />
                <ColumnGroup title="Chi tiết">
                    <Column width={100} title="Hình ảnh" dataIndex="thumbnail" key="detail"
                        render={(record) => (
                            console.log(record),
                            <>
                                <Avatar
                                style={{width:50}}
                                    src={`http://localhost:8080/images/book/${record}`}
                                />
                            </>
                        )}
                    />
                    <Column width={500} title="Tên sách" dataIndex="detail" key="detail"
                        render={(record) => (
                            <>
                                {record}
                            </>
                        )}
                    />

                </ColumnGroup>

                <Column
                    title="Action"
                    key="action"
                    render={(_, record) => (
                        console.log('check record', record),
                        <Space size="middle">
                            <a>Xem lại </a>
                            <Button
                            onClick={()=>{
                                console.log(record)
                               handleReturnBuy(record)
                            }}
                            > <span > Hủy mua</span></Button>
                        </Space>
                    )}
                />
            </Table>
        </div>
        </>
    )
}
export default History;