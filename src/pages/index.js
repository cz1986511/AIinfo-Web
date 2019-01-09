import React, { Component } from 'react';
import { Card } from 'antd';
import { Tabs, BackTop, Alert } from 'antd';
import { Button, Modal, Form, Input, Checkbox, Row, Col } from 'antd';
import { connect } from 'dva';
import myStyles from './styles.css';

const namespace = 'indexlist';

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
  class extends React.Component {
    render() {
      const {
        visible, onCancel, onCreate, form,
      } = this.props;
      const { getFieldDecorator } = form;
      const { TextArea } = Input;
      return (
        <Modal
          visible={visible}
          title="Create a new idea"
          okText="Create"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <Form.Item label="Title">
              {getFieldDecorator('title', {
                rules: [{ required: true, message: 'Please input the title of collection!' }],
              })(
                <Input />
              )}
            </Form.Item>
            <Form.Item label="Author">
              {getFieldDecorator('author')(<Input />)}
            </Form.Item>
            <Form.Item label="Tag">
              {getFieldDecorator('tag', {initialValue: ["B2B"],})
              (
                <Checkbox.Group style={{ width: "100%" }}>
                  <Row>
                    <Col span={5}><Checkbox value="B2B">B2B</Checkbox></Col>
                    <Col span={5}><Checkbox value="研发">研发</Checkbox></Col>
                    <Col span={5}><Checkbox value="架构">架构</Checkbox></Col>
                    <Col span={5}><Checkbox value="创新">创新</Checkbox></Col>
                  </Row>
                </Checkbox.Group>
              )}
            </Form.Item>
            <Form.Item label="Content" className="collection-create-form_last-form-item">
              {getFieldDecorator('content')(<TextArea placeholder="Autosize" autosize={{ minRows: 2, maxRows: 6 }} />)}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  }
);

const mapStateToProps = (state) => {
  const artList = state[namespace].arts;
  const oilinfo = state[namespace].oilinfo;
  const weather = state[namespace].weather;
  return {
    artList,
    oilinfo,
    weather,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDidMount: () => {
      dispatch({
        type: `${namespace}/queryInfo`,
      });
    },
  };
};

const TabPane = Tabs.TabPane;

@connect(mapStateToProps, mapDispatchToProps)
export default class ArtListPage extends Component {
  componentDidMount() {
    this.props.onDidMount();
  }

  state = {
    visible: false,
  };

  showModal = () => {
    this.setState({ visible: true });
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }

  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ visible: false });
    });
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  render() {
    const oilinfo = this.props.oilinfo;
    const weather = this.props.weather;
    const now = weather.now;
    const suggestion = weather.suggestion;
    const sport = suggestion.sport;
    const car_washing = suggestion.car_washing;
    const weatherinfos = oilinfo.updatetime + ' 成都-' + now.text + '-' + now.temperature + '°(运动:' + sport.brief + '|洗车:' + car_washing.brief + ')';
    const oilinfos = '四川今日油价: 92#(' + oilinfo.oil93 + ')|95#(' + oilinfo.oil95 + ')|0#(' + oilinfo.oil0 + ')';
    return (
      <div>
        <div className={myStyles.header1}>
          <Alert message={weatherinfos} type="success" />
          <Alert message={oilinfos} type="success" />
        </div>
        <div className={myStyles.header1}>
        <Tabs defaultActiveKey="1" type="card">
            <TabPane tab="文章" key="1">
            {
              this.props.artList.map(art => {
                return (
                  <Card key={art.id} className={myStyles.article}>
                    <div key={art.id}>
                      <a href={art.linkUrl} target='_blank'>
                        <div className={myStyles.title}>{art.title}</div>
                        <div className={myStyles.content}>
                          <img className={myStyles.img} src={art.picUrl} alt="" />
                          <div className={myStyles.info}>
                            <div className={myStyles.introduction}>{art.introduction}</div>
                            <div><span>{art.source}</span></div>
                            <div><span>{art.date}</span></div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </Card>
                );
              })
            }
            </TabPane>
            <TabPane tab="敬请期待" key="2">
              <div>
                <Button type="primary" onClick={this.showModal}>New</Button>
                <CollectionCreateForm
                  wrappedComponentRef={this.saveFormRef}
                  visible={this.state.visible}
                  onCancel={this.handleCancel}
                  onCreate={this.handleCreate}
                />
              </div>
            </TabPane>
          </Tabs>
        </div>
        <div>
          <BackTop />
        </div>
        <div className={myStyles.header1}>
          <p align="center" className={myStyles.weather}>2019@xiaozhuo.info All Rights Reserved <a href="http://www.miitbeian.gov.cn/" target="_blank">蜀ICP备17024254号</a></p>
        </div>
      </div>
    );
  }
}