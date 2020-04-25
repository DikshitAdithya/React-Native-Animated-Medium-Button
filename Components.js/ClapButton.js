import React, { Component } from 'react';
import { View, Text,TouchableOpacity, StyleSheet,Animated,Image } from 'react-native';

export default class ClapButton extends Component {
    constructor(props){
        super(props);
        this.state = {
            count : 0,
            claps: [],
        }
        this.clap =this.clap.bind(this);
    }
    animationComplete(countNum){
        claps = this.state.claps;
        claps.splice(claps.indexOf(countNum),1);
        this.setState({claps});
    }
    clap(){
        let count = this.state.count;
        let claps = this.state.claps;
        count++;
        claps.push(count);
        this.setState({count});
        
    }
    renderClaps(){
        return this.state.claps.map(countNum => <ClapBubble key={countNum} count={countNum} animationComplete={this.animationComplete.bind(this)} />)
    }

  render() {
    let clapIcon =this.state.count > 0 ? <Image source={require('../Images/clap1.png')}
    style={{height:35,width:35,}}        
   />
   : <Image source={require('../Images/clap2.png')}
   style={{height:35,width:35,}}        
  />
    return (
      <View>
        <TouchableOpacity onPress={this.clap} activeOpacity={0.7} style={styles.clap} >
       
        {clapIcon}
        </TouchableOpacity> 
        {this.renderClaps()}
      </View>
    );
  }
}

class ClapBubble extends Component{
    constructor(){
        super()
        this.state={
            yPosition:new Animated.Value(0),
            opacity:new Animated.Value(0),
        }
    }
    componentDidMount(){
        Animated.parallel([
            Animated.timing(this.state.yPosition,{
                toValue: -140,
                duration:500,
            }),
            Animated.timing(this.state.opacity,{
                toValue:5,
                duration:200,
            })
        ]).start(()=>{
            setTimeout(() => {
                this.props.animationComplete(this.props.count);
             
            },200);
        });
        
    }


    render(){
        let animationStyle = {
            transform : [{translateY: this.state.yPosition}],
            opacity:this.state.opacity,
        }
        return(
            <Animated.View style={[styles.clapbubble,animationStyle]}>
            <Text style={styles.claptext}>+{this.props.count}</Text>
            </Animated.View>   
        );

        
    }
}




const styles=StyleSheet.create({
    clap:{
        backgroundColor: '#f71be5',
        height:60,
        width:60,
        borderRadius:30,
        right:20,
        position: 'absolute',
        top:750,
        elevation:6,
        alignItems: 'center',justifyContent: 'center',
    },
    clapbubble :{
        backgroundColor: '#f71be5',
        height:60,
        width:60,
        borderRadius:30,
        right:20,
        position: 'absolute',
        top:700,
        alignItems: 'center',
        justifyContent: 'center',
    },
    claptext:{
        fontSize:15,
        color:'#fcfafc'
    }
    
})
