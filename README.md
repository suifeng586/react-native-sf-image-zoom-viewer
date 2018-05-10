# react-native-sf-zoom-image-viewer


# 图片查看器，支持手势缩放、分享


![show](./show.gif)


# 安装
* npm install react-native-sf-zoom-image-viewer
* npm install react-native-video
* react-native link react-native-video


# Props
|  parameter  |  type  |  required  |   description  |  default  |
|:-----|:-----|:-----|:-----|:-----|
|width|boolean|no|宽度|屏幕宽度|
|height|boolean|no|高度|屏幕高度|
|backgroundColor|string|no|背景颜色|"black"|
|onScroll|func|no|索引发生变化时调用 onScroll(index)|null|

# SFZiConfig
|  parameter  |  type  |  required  |   description  |  default  |
|:-----|:-----|:-----|:-----|:-----|
|img_dis|number|no|图片间距|10|
|max_speed_x|number|no|滑动速度超过多少进入下一页|0.5|
|max_move_x|number|no|滑动距离超过多少进入下一页|100|
|show_duration|number|no|动画时间|300|
|animated|bool|no|是否有显示动画，如果有在数据里对"handel"进行赋值|true|
|showDes|bool|no|是否显示底部文字，如果有在数据里对"des"进行赋值|true|
|inOneView|bool|no|所有图片是否在同一个界面中，类似轮播图不再一个界面的需要设置成false|true|
|type_img|number|no|显示图片类型|0|
|type_video|number|no|显示图片类型|1|
|type_long_img|number|no|显示图片类型|2|


# Methods
|  Methods  |  Params  |  Param Types  |   description  |  Example  |
|:-----|:-----|:-----|:-----|:-----|
|showWithData|data,index|array,number|显示图片查看器|this.obj.show(data,0)|


# 例子
```
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    ScrollView,
    findNodeHandle,
    Dimensions,
    Image
} from 'react-native';
import {SFZiConfig,SFZiView} from 'react-native-sf-image-zoom-viewer'
var dw = Dimensions.get('window').width;
var dh = Dimensions.get('window').height;

type
Props = {};
export default class App extends Component<Props> {
    click = (index) => {
        var ds = [];
                for (var i = 0; i < this.dataSource.length; i++) {
                    var handel = findNodeHandle(this.refs['img_' + i]);
                    var subData = this.dataSource[i];
                    var data = {
                        source: subData.path,
                        type: subData.type,
                        videoSource: subData.video_path,
                        handel: handel,//SFZiConfig.animated == false时可以不填
                        des:'那年夏天，我无比憧憬大学；今年夏天，我却无比憧憬那年'+i//SFZiConfig.showDes == false时可以不填
                    }
                    ds.push(data);
                }
                this.refs.zoom.showWithData(ds,index);
    }
    render_imgs = () => {
        var imgs = []
        let column = 3;
        let itemWidth = (dw - (10 * column - 10)) / column;
        for (var i = 0; i < this.dataSource.length; i++) {
            var img = this.dataSource[i].path;
            if (typeof(this.dataSource[i].path) == 'string') {
                img = {uri: this.dataSource[i].path}
            }
            imgs.push(
                <TouchableWithoutFeedback key={i} onPress={this.click.bind(this, i)}>
                    <Image ref={'img_' + i} style={{
                        width: itemWidth,
                        height: itemWidth,
                        marginTop: 10
                    }} source={img}></Image>
                </TouchableWithoutFeedback>
            )
        }
        return imgs;
    }

    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: 'white',
            }}>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    marginTop: 80
                }}>
                    {this.render_imgs()}
                </View>
                <SFZiView ref={(ref)=> {
                    this.zoom = ref
                }}/>

            </View>
        )
    }

    componentWillMount() {

        this.dataSource = [
            {
                path: 'http://imgsrc.baidu.com/imgad/pic/item/cdbf6c81800a19d8a1af34d139fa828ba71e46b1.jpg',
                type: SFZoomViewConfig.ZOOM_TYPE_IMG
            },
            {
                path: 'http://img1.imgtn.bdimg.com/it/u=1777558445,2281514504&fm=200&gp=0.jpg',
                type: SFZoomViewConfig.ZOOM_TYPE_IMG
            },
            {
                path: 'http://image.pearvideo.com/cont/20170525/cont-1084591-10337967.jpg',
                type: SFZoomViewConfig.ZOOM_TYPE_VIDEO,
                video_path: 'http://video.pearvideo.com/mp4/short/20170525/cont-1084591-10484983-sd.mp4'
            },
            {
                path: 'http://img2.imgtn.bdimg.com/it/u=2610705528,1626175376&fm=200&gp=0.jpg',
                type: SFZoomViewConfig.ZOOM_TYPE_IMG
            },
            {
                path: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523263263604&di=3a8cf59260058fbc40f36330900fd2cc&imgtype=jpg&src=http%3A%2F%2Fimg4.imgtn.bdimg.com%2Fit%2Fu%3D2779393999%2C2850222965%26fm%3D214%26gp%3D0.jpg',
                type: SFZoomViewConfig.ZOOM_TYPE_LONG_IMG
            },
            {
                path: 'http://img3.imgtn.bdimg.com/it/u=594996916,636240317&fm=200&gp=0.jpg',
                type: SFZoomViewConfig.ZOOM_TYPE_IMG
            },
            {
                path: 'http://img3.imgtn.bdimg.com/it/u=594996916,636240317&fm=200&gp=0.jpg',
                type: SFZoomViewConfig.ZOOM_TYPE_IMG
            },
            {
                path: 'http://img0.imgtn.bdimg.com/it/u=2257366377,1526496951&fm=200&gp=0.jpg',
                type: SFZoomViewConfig.ZOOM_TYPE_IMG
            },
            {
                path: 'http://img1.imgtn.bdimg.com/it/u=3836562103,1802124562&fm=200&gp=0.jpg',
                type: SFZoomViewConfig.ZOOM_TYPE_IMG
            },
        ]


    }

    componentDidMount() {


    }
}

```
