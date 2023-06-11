import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, Pagination, Popconfirm, Table, Typography, message, notification } from 'antd';
import { NavLink, useFetcher } from 'react-router-dom';
import { callDeleteBook, getAllBook, updateBook } from '../../../service/api';
import ModalDetaBook from './ModalDetaiBook';
import { CloudDownloadOutlined, DeleteOutlined, EditOutlined, PlusCircleFilled, PlusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import ModalAddNewBook from './ModalAddBook';
import *as XLSX  from 'xlsx'
import { render } from 'react-dom';

const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{ margin: 0 }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const LayoutBookAM = () => {
    const [form] = Form.useForm();
    const [dataBook, setDataBook] = useState([]);
    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record) => record.key === editingKey;
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5)
    const [sorts, setSorts] = useState('createdAt');
    const [total, setTotal] = useState('');
    const [isShowModalDetaiBook, setIsShowModalDetaiBook] = useState(false)
    const [dataBookView, setDataBookView] = useState([]);
    const [isShowMANB, setIsShowMANB] = useState(false);
    const [listSort, setListSort] = useState([])
    const onClose = () => {
        setIsShowModalDetaiBook(false);
        setIsShowMANB(false)
    }
    

    const edit = async (record) => {
        setPageSize(1)
        form.setFieldsValue({ _id: '', mainText: '', category: '', author: '', price: '', ...record });
        setEditingKey(record.key);
  
    };

    const cancel = () => {
        setEditingKey('');
        setPageSize(5)
    };

    const save = async (key) => {
        try {
            const row = (await form.validateFields());
            const newData = [...dataBook];
            const index = newData.findIndex((item) => key === item.key);
            if (index > -1) {
                const item = newData[index]
                newData[index].price === parseInt(newData[index].price)
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                }
                );
                console.log('check new', newData[index])

                let res = await updateBook(`${newData[index]._id}`, newData[index])
                console.log('check res', res)
                message.success('Update book thành công')
                setPageSize(5)
                getBooks();
                setEditingKey('');
            } else {
                newData.push(row);
                setDataBook(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);

        }
    };
    let key = dataBook.map((item, index) => {
        return { text: item.mainText, value: item.mainText }
    })
    let keycategory = dataBook.map((item, index) => {
        return { text: item.category, value: item.category }
    })
    let keyauthor = dataBook.map((item, index) => {
        return { text: item.author, value: item.author }
    })


    const columns = [
        {   
         
            title: 'Id',
            dataIndex: '_id',
            editable: true,
            width: 200,
            render: (text, record, index) => {
                // console.log(record)
                // console.log(index)
                // console.log(text)
                return (
                    <a onClick={() => {
                        setDataBookView(record)
                        setIsShowModalDetaiBook(true)
                    }} href='#'> {text}</a>
                )
            }
        },
        {
            title: 'Tên sách',
            dataIndex: 'mainText',
            width: 300,
            editable: true,
            sorter: true,

            filters: key,
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value, record) => record.mainText.startsWith(value),

        },

        {
            title: 'Thể loại',
            dataIndex: 'category',
            width: 150,
            editable: true,
            ellipsis: true,

            filters: keycategory,
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value, record) => record.category.startsWith(value)
        },
        {
            title: 'Tác giả',
            dataIndex: 'author',
            width: 200,
            editable: true,
            sorter: true,
            filters: keyauthor,
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value, record) => record.author.startsWith(value)
        },
        {
            title: 'Giá tiền ',
            dataIndex: 'price',
            width: 150,
            editable: true,
            sorter: true,
            render:(_,record)=>{
                return(<>
               <div> {record.price} đ </div> 
                </>)
            }
        },
        {
            title: 'Ngày cập nhật',
            dataIndex: 'updatedAt',
            width: 200,
            editable: true,
            sorter: true
        },
        {
            width: 150,
            title: 'Action',
            dataIndex: 'operation',
            render: (text, record, item) => {
                // console.log(record)
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link onClick={() => save(record.key)} style={{ marginRight: 8 }}>
                            Save
                        </Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <>
                        <Typography.Link
                            onClick={() => edit(record)
                            }>
                            <EditOutlined style={{paddingLeft:5}} />
                        </Typography.Link>
                        <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record)}>
                            <DeleteOutlined style={{ color: 'red' }}
                            />
                        </Popconfirm>

                    </>



                );

            },
        },
    ];
    const handleDelete = async (record) => {
        let res = await callDeleteBook(record._id)
        if (res?.data) {
            message.success('Xóa book thành công')
        } else {
            notification.error({
                name: 'Có lỗi xảy ra',
             message:''
            })
        }
        getBooks()
    }
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'price' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    const getBooks = async () => {
        let query = `?current=${current}&pageSize=${pageSize}`
        // let query = `?current=${current}&pageSize=${pageSize}&sort=${sorts}`;
        let res = await getAllBook(query);
        if (res) {
            setDataBook(res.data.result)
            setTotal(res.data.meta.total)
        }

    }
    const onchangePage = (Pagination, Total) => {

        if (Pagination !== current) {
            setCurrent(Pagination)
        }
        if (Total !== pageSize) {
            setPageSize(Total)
        }
    }
    const onchangeTalbe = async (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
        if (sorter) {
            if (!sorter.order) return;
            if (sorter.order == 'ascend') {
                let query = `?current=${pagination.current}&pageSize=${pagination.pageSize}&sort=${sorter.field}`;
                let res1 = await getAllBook(query)
                setDataBook(res1.data.result)
            }
            if (sorter.order == 'descend') {
                let query = `?current=${pagination.current}&pageSize=${pagination.pageSize}&sort=-${sorter.field}`;
                let res1 = await getAllBook(query)
                console.log('check re1', res1);
                setDataBook(res1.data.result)
            }
        }
    }

    useEffect(() => {
        getBooks()
    }, [current, pageSize])

    const downLoadCSV = (dataBook) =>{
        const worksheet = XLSX.utils.json_to_sheet(dataBook);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
        //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
        XLSX.writeFile(workbook, "dataBook.xlsx");
    }
    return (<>
     
        <ModalAddNewBook
            isShowMANB={isShowMANB}
            onClose={onClose}
        />
        <Form form={form} component={false}>
            <div>
                <h2 style={{ display: 'flex', width: 250, paddingTop: 50, justifyItems: 'center' }}>List Books
           
                   <PlusCircleFilled
                        onClick={() => {
                            setIsShowMANB(true)
                        }}
                        style={{ color: 'blue', fontSize: 25 }} />
                 
                    <CloudDownloadOutlined 
                            onClick={() => downLoadCSV(dataBook)}
                            style={{ fontSize:22, marginRight:0 }} 
                        />
                  
                    </h2>
                    
            </div>
 
            <Table
                
                onChange={onchangeTalbe}
                style={{ display: 'flex', justifyContent: 'space-between',textAlign:'center' }}
                components={{
                    body: {

                        cell: EditableCell,
                    },
                }}
                bordered
                dataSource={dataBook}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{
                    onChange: onchangePage,
                    showTotal: (total, range) => {
                        return (
                            <>{range[0]}-{range[1]} / {total}</>
                        )

                    },
                    // onChange: cancel,
                    current: current,
                    pageSize: pageSize,
                    showSizeChanger: true,
                    total: total
                }}
            />
        </Form>
        <ModalDetaBook
            isShowModalDetaiBook={isShowModalDetaiBook}
            onClose={onClose}
            dataBookView={dataBookView}
            dataBook={dataBook}
        />
    </>)
}
export default LayoutBookAM