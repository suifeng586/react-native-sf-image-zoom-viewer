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
export default class SFZoomViewHeader extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isShow:false
        }
    }
    static propTypes = {
        cropWidth: PropTypes.number.isRequired,
        maxIndex: PropTypes.number.isRequired,
        curIndex: PropTypes.number.isRequired,
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
                height:80,
                alignItems:'center',
                justifyContent:'center',
                position:'absolute',
                left:0,
                top:0
            }}>
                <Text style={{
                    width:this.props.cropWidth-160,
                    color:'white',
                    textAlign:'center',
                    fontSize:14,
                    fontWeight:'bold'
                }}>{(this.props.curIndex+1)+'/'+this.props.maxIndex}</Text>
            </View>
        )
    }

}

const styles = StyleSheet.create(

)
