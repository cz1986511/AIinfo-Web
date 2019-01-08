import React, { Component } from 'react';
import { Card } from 'antd';
import { Tabs, Icon, BackTop, Alert } from 'antd';
import { connect } from 'dva';
import myStyles from './styles.css';

const namespace = 'indexlist';

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

  render() {
    const oilinfo = this.props.oilinfo;
    const weather = this.props.weather;
    const now = weather.now;
    const suggestion = weather.suggestion;
    const sport = suggestion.sport;
    const car_washing = suggestion.car_washing;
    const weatherinfos = oilinfo.updatetime + ' 成都-' + now.text + '-' + now.temperature + '°(运动:' + sport.brief + '|洗车:' + car_washing.brief + ')';
    const oilinfos = '四川油价: 92#(' + oilinfo.oil93 + ')|95#(' + oilinfo.oil95 + ')|0#(' + oilinfo.oil0 + ')';
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
            <TabPane tab="敬请期待" key="2">页面开发中。。。</TabPane>
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