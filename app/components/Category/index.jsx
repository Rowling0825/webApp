import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import ReactSwipe from 'react-swipe'
import { Link } from 'react-router'

import './style.less'

class Category extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
        	index : 0
        }
    }
    render() {
    	var opt = {
    		auto:2000,
    		//需要把每次轮播的index存储起来 并且赋值给组件的状态
    		//注意this的指向问题
    		callback:function(index){
    			this.setState({index:index})
    		}.bind(this)
    	}
        return (
        	<div id="home-category">
                <ReactSwipe className="carousel" swipeOptions={opt}>
                    <div className = "carousel-item">
                    <ul className ='clear-fix'>
                    	<Link to="/search/meishi"><li className='float-left meishi'>美食</li></Link>
                    	<Link to="/search/maoyan"><li className="float-left maoyan">猫眼</li></Link>
                    	<Link to="/search/jiudian"><li className="float-left jiudian">酒店</li></Link>
                    	<Link to="/search/xiuxian"><li className="float-left xiuxian">休闲</li></Link>
                    	<Link to="/search/waimai"><li className="float-left waimai">外卖</li></Link>
                    	<Link to="/search/KTV"><li className="float-left ktv">KTV</li></Link>
                    	<Link to="/search/zhoubian"><li className="float-left zhoubian">周边旅游</li></Link>
                    	<Link to="/search/liren"><li className="float-left liren">丽人</li></Link>
                    	<Link to="/search/xiaochi"><li className="float-left xiaochi">小吃</li></Link>
                    	<Link to="/search/jipiao"><li className="float-left jipiao">机票</li></Link>
                    </ul>
                    </div>
                   <div className = "carousel-item">
                    <ul className ='clear-fix'>
                    	<Link to="/search/meishi"><li className='float-left meishi'>美食</li></Link>
                        <Link to="/search/maoyan"><li className="float-left maoyan">猫眼</li></Link>
                        <Link to="/search/jiudian"><li className="float-left jiudian">酒店</li></Link>
                        <Link to="/search/xiuxian"><li className="float-left xiuxian">休闲</li></Link>
                        <Link to="/search/waimai"><li className="float-left waimai">外卖</li></Link>
                        <Link to="/search/KTV"><li className="float-left ktv">KTV</li></Link>
                        <Link to="/search/zhoubian"><li className="float-left zhoubian">周边旅游</li></Link>
                        <Link to="/search/liren"><li className="float-left liren">丽人</li></Link>
                        <Link to="/search/xiaochi"><li className="float-left xiaochi">小吃</li></Link>
                        <Link to="/search/jipiao"><li className="float-left jipiao">机票</li></Link>
                    </ul>
                    </div>
                    <div className = "carousel-item">
                    <ul className ='clear-fix'>
                    	<Link to="/search/meishi"><li className='float-left meishi'>美食</li></Link>
                        <Link to="/search/maoyan"><li className="float-left maoyan">猫眼</li></Link>
                        <Link to="/search/jiudian"><li className="float-left jiudian">酒店</li></Link>
                        <Link to="/search/xiuxian"><li className="float-left xiuxian">休闲</li></Link>
                        <Link to="/search/waimai"><li className="float-left waimai">外卖</li></Link>
                        <Link to="/search/KTV"><li className="float-left ktv">KTV</li></Link>
                        <Link to="/search/zhoubian"><li className="float-left zhoubian">周边旅游</li></Link>
                        <Link to="/search/liren"><li className="float-left liren">丽人</li></Link>
                        <Link to="/search/xiaochi"><li className="float-left xiaochi">小吃</li></Link>
                        <Link to="/search/jipiao"><li className="float-left jipiao">机票</li></Link>
                    </ul>
                    </div>
                </ReactSwipe>
                    <div className="index-container">
                    <ul>
                    <li className = {this.state.index === 0 ? "selected" : ''}></li>
                    <li className = {this.state.index === 1 ? "selected" : ''}></li>
                    <li className = {this.state.index === 2 ? "selected" : ''}></li>
                    </ul>
                    </div>
            </div>
        )
    }
    componentDidMount() {
          
    }
}
export default Category
