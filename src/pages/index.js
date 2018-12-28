import React, { Component } from 'react';
import { Card } from 'antd';
import { connect } from 'dva';

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
    return (
      <div>
        <div style={{ padding: '0 27px', }}>
          <div style={ {backgroundColor: '#F0FFF0',} }>
            成都-{now.text}-{now.temperature}°(运动:{sport.brief}|洗车:{car_washing.brief})
          </div>
        </div>
        <div style={{ padding: '0 27px', }}>
          <div style={ {backgroundColor: '#F0FFF0',} }>
            {oilinfo.updatetime} 四川油价: 92#({oilinfo.oil93})|95#({oilinfo.oil95})|0#({oilinfo.oil0})
          </div>
        </div>
        {
          this.props.artList.map(art => {
            return (
              <Card key={art.id}>
                <div key={art.id} style={{ padding: '0 15px',backgroundColor: '#F0FFF0', }}>
                  <a href={art.linkUrl} target='_blank'>
                    <div
                      style={{
                        lineHeight: '50px',
                        color: '#336666',
                        fontSize: 18,
                        borderBottom: '1px solid #F6F6F6',
                      }}
                    >{art.title}</div>
                    <div style={{ display: '-webkit-box', display: 'flex', padding: '15px 0', color: '#5B5B5B'}}>
                      <img style={{ height: '64px', marginRight: '15px' }} src={art.picUrl} alt="" />
                      <div style={{ lineHeight: 1 }}>
                        <div style={{ marginBottom: '22px', }}>{art.introduction}</div>
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
      </div>
    );
  }
}