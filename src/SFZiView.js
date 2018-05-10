/**
 * Created by rw on 2018/4/7
 * Desc:多图查看器，包括放大缩小，视频、长图查看。提供显示和隐藏动画
 *
 * 第三方库安装
 * npm install react-native-md5
 * npm install react-native-video
 * react-native link react-native-video
 */
import React, {Component} from "react";
import {
    StyleSheet,
    Image,
    Dimensions,
    View,
    TouchableWithoutFeedback,
    ScrollView,
    Text,
    PanResponder,
    Animated,
    Modal
} from "react-native";
import PropTypes from 'prop-types'
import SFZiImage from "./SFZiImage"
import SFZiHeader from "./SFZiHeader"
import SFZiFooter from "./SFZiFooter"
import SFZiConfig from "./SFZiConfig"
var dw = Dimensions.get('window').width;
var dh = Dimensions.get('window').height;
export default class SFZiView extends Component {

    constructor(props) {
        super(props)
        this.state=({
            isShow:false,
            dataSource:[],
            curIndex:0,
        })
    }

    static propTypes = {
        width:PropTypes.number,
        height:PropTypes.number,
        backgroundColor: PropTypes.string,
        onScroll: PropTypes.func
    }
    static defaultProps = {
        width:dw,
        height:dh,
        animated: true,
        showDes: true,
        backgroundColor: 'black'
    }

    showWithData = (data,showIndex) => {
        this.imgCount = data.length;
        this.firstIndex = showIndex;
        if (SFZiConfig.animated == false){
            this.firstIndex = -1;
        }
        this.setState({
            dataSource:data,
            isShow:true,
            curIndex:showIndex
        },()=>{
            SFZiConfig.firstHandel = this.state.dataSource[0].handel;
            var zoomImage = this.refs['zoom_img_'+this.state.curIndex ];
            zoomImage.showZoomFadeIn();
            this.scrollToIndex(this.state.curIndex,false)

        })
    }

    scrollToIndex = (index,animated) => {
        if (index >= 0 && index < this.imgCount){
            this.posX = -(this.props.width+SFZiConfig.img_dis)*(index);
            if (animated){
                Animated.timing(this.aniPosX, {
                    toValue: this.posX,
                    duration: 100,
                }).start()
            }else{
                this.aniPosX.setValue(this.posX)
            }

        }
    }
    onNext = (index) => {
        if (index+1 < this.imgCount){
            this.posX = -(this.props.width+SFZiConfig.img_dis)*(index+1);
            Animated.timing(this.aniPosX, {
                toValue: this.posX,
                duration: 100,
            }).start()
            this.setState({curIndex:index+1});
            if (this.props.onScroll){
                this.props.onScroll(index+1)
            }
            return true
        }else{
            this.onRecover(index);
            return false
        }
    }
    onLast = (index) => {
        if (index-1 >= 0){
            this.posX = -(this.props.width+SFZiConfig.img_dis)*(index-1);
            Animated.timing(this.aniPosX, {
                toValue: this.posX,
                duration: 100,
            }).start()
            this.setState({curIndex:index-1});
            if (this.props.onScroll){
                this.props.onScroll(index-1)
            }
            return true
        }else{
            this.onRecover(index);
            return false
        }
    }
    onRecover = (index,animated = true) => {
        this.posX = -(this.props.width+SFZiConfig.img_dis)*index;
        if (animated){
            Animated.timing(this.aniPosX, {
                toValue: this.posX,
                duration: 100,
            }).start()
        }else{
            this.aniPosX.setValue(this.posX);
        }

    }
    onHide = () => {

        this.setState({
            isShow:false
        })

    }
    onHorizontalOuter = (index,diff) => {
        this.posX = -(this.props.width+SFZiConfig.img_dis)*index+diff;
        if (index == 0){
            if (this.posX >= 20){
                this.posX = 20;
            }
        }else if (index == this.imgCount-1){
            if (this.posX < -(this.props.width+SFZiConfig.img_dis)*index-20){
                this.posX = -(this.props.width+SFZiConfig.img_dis)*index-20
            }
        }

        this.aniPosX.setValue(this.posX);
    }
    onAniZoomBegin = () => {
        Animated.timing(this.aniOpacity, {
            toValue: 1,
            duration: SFZiConfig.show_duration,
        }).start()
    }
    onAniZoomEnd = () => {
        Animated.timing(this.aniOpacity, {
            toValue: 0.5,
            duration: SFZiConfig.show_duration,
        }).start()
        this.header.hide()
        if (SFZiConfig.showDes){
            this.footer.hide()
        }
    }
    onAniZoomBeginFinish = () => {
        this.header.show()
        if (SFZiConfig.showDes){
            this.footer.show()
        }

    }
    render_imgs = () => {
        var imgs = [];
        for (var i = 0; i < this.imgCount;i++){
            var left = SFZiConfig.img_dis;
            if (i == 0){
                left = 0;
            }
            imgs.push(

                    <SFZiImage
                        ref={'zoom_img_'+i}
                        key={i}
                        index={i}
                        firstIndex={this.firstIndex}
                        imgData={this.state.dataSource[i]}
                        cropWidth={this.props.width}
                        cropHeight={this.props.height}
                        onNext={this.onNext}
                        onLast={this.onLast}
                        onRecover={this.onRecover}
                        onHorizontalOuter={this.onHorizontalOuter}
                        onHide={this.onHide}
                        onAniZoomBegin={this.onAniZoomBegin}
                        onAniZoomEnd={this.onAniZoomEnd}
                        onAniZoomBeginFinish={this.onAniZoomBeginFinish}
                    />

            )
        }
        return imgs;
    }
    render_footer = () => {
        if (SFZiConfig.showDes == false){
            return null;
        }
        return(
            <SFZiFooter
                ref = {(ref) => {this.footer = ref}}
                cropWidth={this.props.width}
                cropHeight={this.props.height}
                curIndex={this.state.curIndex}
                imgDatas={this.state.dataSource}/>
        )
    }
    render_header = () => {
        return(
            <SFZiHeader
                ref = {(ref) => {this.header = ref}}
                cropWidth={this.props.width}
                curIndex={this.state.curIndex}
                maxIndex={this.imgCount}/>
        )
    }
    render() {

        return (
            <Modal animationType={"fade"} visible={this.state.isShow} transparent={true}>
                <Animated.View style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: this.props.width,
                    height: this.props.height,
                }}>
                    {/*背景*/}
                    <Animated.View style={{
                        backgroundColor: this.props.backgroundColor,
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        width: this.props.width,
                        height: this.props.height,
                        opacity:this.aniOpacity
                    }}>
                    </Animated.View>
                    {/*滚动图片*/}
                    <Animated.View
                        style={{
                            flexDirection:'row',
                            height:this.props.height,
                            width:(this.props.width+SFZiConfig.img_dis)*this.imgCount,
                            transform:[{translateX:this.aniPosX}],
                            alignItems:'center',
                        }}
                    >
                        {this.render_imgs()}
                    </Animated.View>
                    {/*头部显示*/}
                    {this.render_header()}
                    {/*底部显示*/}
                    {this.render_footer()}

                </Animated.View>
            </Modal>
        )
    }



    componentWillMount() {
        this.imgCount = 0;//图片总数量
        this.firstIndex = 0;//首次显示的索引

        this.posX = 0;
        this.aniPosX = new Animated.Value(this.posX);
        this.aniOpacity = new Animated.Value(0);
    }

    componentDidMount(){

    }



}

const styles = StyleSheet.create(

)
