import React, {Component} from "react";
import {
    StyleSheet,
    Image,
    Dimensions,
    View,
    TouchableWithoutFeedback
} from "react-native";
import PropTypes from 'prop-types'
import SFZiConfig from './SFZiConfig'
import SFZiLongImage from'./tool/SFZiLongImage'
import SFZiVideo from './tool/SFZiVideo'
export default class SFZiButton extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isShow:true
        }
    }
    static propTypes = {
        imgData: PropTypes.object.isRequired,
        cropWidth: PropTypes.number.isRequired,
        cropHeight: PropTypes.number.isRequired,
    }
    componentDidMount(){

    }
    show =() => {
        this.setState({
            isShow:true
        })
    }
    hide = () => {
        this.setState({
            isShow:false
        })
    }
    clickVideo = () => {
        this.refVideo.show(this.props.imgData.videoSource);
    }
    clickBigImage = () => {
        this.refBigImage.show(this.props.imgData.source);
    }
    render_buttons = () => {
        if (this.props.imgData.type == SFZiConfig.type_video){
            return(
                <TouchableWithoutFeedback onPress={this.clickVideo}>
                    <Image source={require('./img/play.png')} style={{
                        width:60,
                        height:60,
                    }}></Image>
                </TouchableWithoutFeedback>

            )
        }else if (this.props.imgData.type == SFZiConfig.type_long_img){
            return(
                <TouchableWithoutFeedback onPress={this.clickBigImage}>
                    <Image source={require('./img/big.png')} style={{
                        width:60,
                        height:60,
                    }}></Image>
                </TouchableWithoutFeedback>
            )
        }else{
            return null
        }
    }
    render() {
        if (this.state.isShow == false){
            return null;
        }
        if (this.props.imgData.type != SFZiConfig.type_img){
            return(
                <View style={{
                    width:60,
                    height:60,
                    position:'absolute',
                    left:(this.props.cropWidth-60)/2,
                    top:(this.props.cropHeight-60)/2
                }}>
                    {this.render_buttons()}
                    <SFZiLongImage ref={(ref) => {this.refBigImage = ref}}/>
                    <SFZiVideo ref={(ref) => {this.refVideo = ref}}/>
                </View>
            )
        }
        return null


    }

}