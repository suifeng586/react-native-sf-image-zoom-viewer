import React, {Component} from "react";
import {
    StyleSheet,
    Image,
    Dimensions,
    View,
    Text,
    TouchableWithoutFeedback
} from "react-native";
import PropTypes from 'prop-types'
export default class SFZiFooter extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isShow:false
        }
    }
    static propTypes = {
        cropWidth: PropTypes.number.isRequired,
        cropHeight: PropTypes.number.isRequired,
        curIndex: PropTypes.number.isRequired,
        imgDatas: PropTypes.array.isRequired
    }
    show = () => {
        this.setState({isShow:true})
    }
    hide = () => {
        this.setState({isShow:false})
    }
    componentDidMount(){

    }

    render() {
        if (this.state.isShow == false){
            return null;
        }
        return (
            <View style={{
                width:this.props.cropWidth,
                height:60,
                alignItems:'center',
                justifyContent:'center',
                position:'absolute',
                left:0,
                top:this.props.cropHeight-80
            }}>
                <Text numberOfLines={3} style={{
                    width:this.props.cropWidth-20,
                    color:'white',
                    textAlign:'left',
                    fontSize:12,
                    fontWeight:'bold',
                    letterSpacing:1,
                    lineHeight:14,
                }}>{this.props.imgDatas[this.props.curIndex].des}</Text>
            </View>
        )
    }

}

const styles = StyleSheet.create(

)
