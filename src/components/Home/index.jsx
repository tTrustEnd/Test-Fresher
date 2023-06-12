import { Col, Form, Row, Checkbox, InputNumber, Rate, Tabs, Pagination, Image, TreeSelect, Radio, Button } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { getAllBook } from "../../service/api";
import { useNavigate, useOutletContext } from "react-router-dom";
import { MinusOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

const Home = () => {
  const searchTerm = useSelector(state => state.order.term)
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [dataBook, setDataBook] = useState([]);
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [total, setTotal] = useState()
  const onFinish = async(values) => {
      let res = dataBook.filter(item => item.price - values.start >= 0 && item.price - values.end <= 0);
      setDataBook(res);
  };
 
  const onChange2 = async (key) => {
    if (key) {
      let query = `?current=${current}&pageSize=${pageSize}&sort=${key}`
      let res = await getAllBook(query);
      setDataBook(res.data.result)
    }
  };
  const onChange = async (value) => {
    if (value) {
      let query = `?current=${current}&pageSize=${pageSize}&category=${value}`
      let res = await getAllBook(query);
      setDataBook(res.data.result)
    }
    if (value === undefined) {
      getBooks()
    }
   
  };
  const onchangePage = (Pagination) => {
    if (Pagination !== current) {
      setCurrent(Pagination)
    }
  }

  const y = dataBook.map((item, index) => {
    return { value: item.category, title: item.category, label: index };
  })
  const treeData = [

    {
      title: 'Thể loại',
      children: y
    },


  ];
  const items = [
    {
      key: '1',
      label: `Phổ biến`,
      children:<></>,
    },
    {
      key: '-sold',
      label: `Bán chạy`,
      children:<></>,
    },
    {
      key: 'createdAt',
      label: `Hàng mới`,
      children: <></>,
    },
    {
      key: '-price',
      label: `Giá trị nhất`,
      children: <></>,
    },
    {
      key: '5',
      label: `Thể loại`,
      children: <></>,
    },
  ];
  const getBooks = async () => {
  
    if(searchTerm){
      let query = `?current=${current}&pageSize=${pageSize}&mainText=/${searchTerm}/i`
      let res1 = await getAllBook(query)
      setDataBook(res1.data.result)
    setTotal(res1.data.meta.total)
    }
    else{
      let query = `?current=${current}&pageSize=${pageSize}`
      let res = await getAllBook(query)
      setDataBook(res.data.result)
      setTotal(res.data.meta.total)
    }

  }
  //thêm params và slug sau khi bấm vào thằng book để ra 1 trang mới
  const nonAccentVietnamese = (str) => {
    str = str.replace(/A|Á|À|Ã|Ạ|Â|Ấ|Ầ|Ẫ|Ậ|Ă|Ắ|Ằ|Ẵ|Ặ/g, "A");
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/E|É|È|Ẽ|Ẹ|Ê|Ế|Ề|Ễ|Ệ/, "E");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/I|Í|Ì|Ĩ|Ị/g, "I");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/O|Ó|Ò|Õ|Ọ|Ô|Ố|Ồ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ỡ|Ợ/g, "O");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/U|Ú|Ù|Ũ|Ụ|Ư|Ứ|Ừ|Ữ|Ự/g, "U");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/Y|Ý|Ỳ|Ỹ|Ỵ/g, "Y");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/Đ/g, "D");
    str = str.replace(/đ/g, "d");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng 
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
    return str;
  }
  const convertSlug = (str) => {
    str = nonAccentVietnamese(str);
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();
    // remove accents, swap ñ for n, etc
    var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
    var to = "aaaaaeeeeeiiiiooooouuuunc------";
    for (var i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'); // collapse dashes

    return str;
  }

  useEffect(() => {
    getBooks()
  }, [current, pageSize,searchTerm])

  
// Breakpoint	Class infix	Dimensions
// X-Small	None	<576px
// Small	sm	≥576px
// Medium	md	≥768px
// Large	lg	≥992px
// Extra large	xl	≥1200px
// Extra extra large	xxl	≥1400px
  return (
    <>
      <div className="Home-container" style={{ maxWidth: 1920 }}>
        <Row gutter={[20, 20]}>
          <Col xxl={5} xl={5} lg={7} md={0} sm={0} xs={0} style={{ paddingLeft: 50 }}>
            <div>Bộ lọc tìm kiếm</div>
            <span>Danh mục sản phẩm</span>
            <Form
              form={form}
              onValuesChange={(changedValues, values) => HandleonValuesChange(changedValues, values)}
              onFinish={onFinish}

            >
              <Form.Item
              >
                <TreeSelect
                  onChange={onChange}
                  showSearch
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto', minWidth: 300 }}
                  placeholder="Please select"
                  dropdownMatchSelectWidth={false}
                  placement='bottomLeft'
                  allowClear
                  treeDefaultExpandAll
                  treeData={treeData}
                />
              </Form.Item>
              <div> Khoảng giá VND</div>
              <div style={{ display: 'flex' }}>

                <Form.Item
                  name={'start'}
                >
                  <InputNumber
                    name="form"
                    defaultValue={1000}
                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                  />
                </Form.Item>

                <MinusOutlined />

                <Form.Item
                  name={'end'}
                >
                  <InputNumber
                    name="to"
                    defaultValue={1000}
                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                  />
                </Form.Item >
              </div>
              <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  style={{display:'flex', color: 'black', background: '#00ffff'}}
                  onClick={() => form.submit()}
                >Áp dụng
                </Button>
              </Form.Item>
              <Rate allowHalf defaultValue={5} style={{ width: '50%' }} /> 95%
              <Rate allowHalf defaultValue={4} style={{ width: '50%' }} /> 5%
              <Rate allowHalf defaultValue={3} style={{ width: '50%' }} /> 0%
              <Rate allowHalf defaultValue={2} style={{ width: '50%' }} /> 0%
              <Rate allowHalf defaultValue={1} style={{ width: '50%' }} /> 0%
            </Form>
          </Col>
          {/* col2col2col2col2col2col2col2col2col2col2col2col2col2col2col2col2col2col2col2col2col2col2col2 */}
          <Col xxl={15} xl={5} lg={13} md={18}    style={{}}>
            <Tabs defaultActiveKey="1" items={items} onChange={onChange2} />
            <Row xxl={17} md={25} style={{ display: 'flex', width: '1350px' }}>
              {dataBook && dataBook.length > 0 &&
                dataBook.map((item, index) => {
                  return (
                    <>
                      <div key={`book-${index}`}
                        style={{ display: 'flex', justifyContent: 'center' }}
                      >
                        <div
                          style={{ textAlign: 'center', width: 250 }}
                        >
                          <Image
                          onClick={()=>{
                           let res = convertSlug(item.mainText);
                            navigate(`/book/${res}/?id=${item._id}`)
                          }}
                          preview={false}
                            width={100}
                            src={`${import.meta.env.VITE_BASE_URL}/images/book/${item.thumbnail}`}
                          />
                          <div style={{}} >
                            {item.mainText}
                          </div>
                          {item.mainText.length < 35 && <br />}
                          <div style={{ fontSize: 12, textAlign: "center" }}>
                            <Rate defaultValue={5}></Rate>    Đã bán {item.sold}
                          </div>
                          <div style={{ color: 'red', textAlign: "center", paddingBottom: 25 }} >
                            <span> {item.price}  đ </span>
                          </div>
                        </div>

                      </div>
                    </>
                  )
                })
              }


            </Row>

            <Row style={{ display: 'flex', justifyContent: 'center' }}>
              <Pagination
                onChange={onchangePage}
                current={current}
                pageSize={pageSize}
                total={total}
                showTotal={(total, range) => { return (<>{`${range[0]}-${[range[1]]}/${total}`}</>) }}
              />
            </Row>
          </Col>
        </Row>
      </div>
    </>
  )
}
export default Home;