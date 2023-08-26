import { Component } from 'react'
import { AiOutlineInfoCircle,AiOutlineMenu} from 'react-icons/ai'
import { BsCurrencyDollar, BsSearch } from 'react-icons/bs'
import { RiTokenSwapLine, RiNftFill } from 'react-icons/ri'
import { MdOutlineToken, MdToken } from 'react-icons/md'
import './index.css'

class Home extends Component {
    state = { bI: [], bT: [], qT: [], price: [], key: '' ,text:''}
    componentDidMount() {
        this.getData();
    }
    onSearch = () => {
        console.log("hi");
        this.getData();
    }

    onGet = (event) => {

        this.setState({
            key: event.target.value
        })

    }
    getData = async () => {
        //https://api.dexscreener.com/latest/dex/tokens/:0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599
        //https://api.dexscreener.com/latest/dex/search/?q=:WBTC
        const isAlpha = str => /^[a-zA-Z]*$/.test(str);
        const { key } = this.state
        console.log(key)
        let response,t;
        if (key !== "" && isAlpha(key)) {
            response = await fetch(`https://api.dexscreener.com/latest/dex/search/?q=${key}`);
            t="Pair Search Results";
        }
        else if (key !== "") {
            response = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${key}`);
            t="Token Search Results";
        }
        try {


            if (response.ok === true) {
                const data = await response.json();
                console.log(data);
                const updated = data.pairs.map(each => ({
                    chainId: each.chainId,
                    dexId: each.dexId,
                    pairAddress: each.pairAddress,
                    pairCreatedAt: each.pairCreatedAt,

                }))
                const quoteToken = data.pairs.map(each => ({
                    name: each.quoteToken.name,
                    symbol: each.quoteToken.symbol,
                    address: each.quoteToken.address,

                }))
                const baseToken = data.pairs.map(each => ({
                    name: each.baseToken.name,
                    symbol: each.baseToken.symbol,
                    address: each.baseToken.address,

                }))
                const price1 = data.pairs.map(each => ({
                    priceNative: each.priceNative,
                    priceUsd: each.priceUsd,


                }))
                this.setState({
                    bI: updated,
                    bT: baseToken,
                    qT: quoteToken,
                    price: price1,
                    text:t,
                })

            }
        }
        catch (e) {
            console.log(e);
        }

    }
    //<ConnectButton label="Sign in" />
    render() {
        const { qT, bI, bT, price, text } = this.state
        return (
            <div className='main-container'>
                
                <div className='app-container'>
                    <div className="menu-md-container">
                        <div className='menu'>
                            <li className='item'>
                                <div className='item-container'>
                                    <RiNftFill />
                                    <p className='title'>
                                        NFTLIY
                                    </p>
                                </div>
                            </li>
                            <li className='item'>
                                <div className='item-container'>
                                    <MdToken />
                                    <p className='caption'>
                                        Token Address
                                    </p>
                                </div>
                            </li>
                            <li className='item'>
                                <div className='item-container'>
                                    <RiTokenSwapLine />
                                    <p className='caption'>
                                        Pair Address
                                    </p>
                                </div>
                            </li>
                        </div>
                        <div className='image-container'>
                            <img
                                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png" className='image'
                                alt="facebook logo"
                            />
                            <img
                                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png" className='image'
                                alt="twitter logo"
                            />
                            <img
                                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png" className='image'
                                alt="linked in logo"
                            />
                        </div>

                    </div>
                    <div className='s'>
                        <div className='menu-sm-container'>
                            <li className='item'>
                                <div className='item-container'>
                                    <AiOutlineMenu />
                                    <p className='title'>
                                        NFTLIY
                                    </p>
                                </div>
                            </li>
                            <div>
                                <button className="button connect" >Connect</button>
                            </div>
                        </div>
                        <div className='nav-container'>
                            <div className="navbar">
                                <div className='search-container'>
                                    <input
                                        type="text"
                                        onChange={this.onGet}
                                        placeholder="Search"
                                        className='input'
                                    />
                                    <button className='search' onClick={this.onSearch}><BsSearch /></button>
                                </div>
                                <button className="button connect-md" >Connect</button>
                            </div>

                        </div>
                        <h1 className='t'>{text}</h1>
                        <div className='data-container'>

                            <div className='baseInfo-container'>
                                {bI.map(each => {
                                    return (
                                        <div className='card'>
                                            <table className=''>
                                                <tr>
                                                    <th className='left'>Basic Info</th>
                                                </tr>
                                                <tr>
                                                    <td className='left'>Pair Created At</td>
                                                    <td className='right'>{(each.pairCreatedAt) / 1000}</td>
                                                </tr>
                                                <tr>
                                                    <td className='left'>Symobl</td>
                                                    <td>{each.chainId}</td>
                                                </tr>
                                                <tr>
                                                    <td className='left'>Dex Id</td>
                                                    <td>{each.dexId}</td>
                                                </tr>
                                                <tr>
                                                    <td className='left'>Pair Address</td>
                                                    <td>{`#${(each.pairAddress).slice(0, 5)}`}</td>
                                                </tr>
                                            </table>
                                            <div className='icon-container'> <AiOutlineInfoCircle className="icon" /></div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className='baseToken-container'>
                                {bT.map(each => {
                                    return (
                                        <div className='card'>
                                            <table className=''>
                                                <tr>
                                                    <th className='left'>Basic Token</th>
                                                </tr>
                                                <tr>
                                                    <td className='left'>Name</td>
                                                    <td className='right'>{(each.name).slice(7)}</td>
                                                </tr>
                                                <tr>
                                                    <td className='left'>Symobl</td>
                                                    <td>{each.chainId}</td>
                                                </tr>
                                                <tr>
                                                    <td className='left'>Address</td>
                                                    <td>{`#${(each.address).slice(0, 5)}`}</td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                            </table>
                                            <div className='icon-container'> <MdOutlineToken className="icon" /></div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className='quoteToken-container'>
                                {qT.map(each => {
                                    return (
                                        <div className='card'>
                                            <table className=''>
                                                <tr>
                                                    <th className='left'>Quote Token</th>
                                                </tr>
                                                <tr>
                                                    <td className='left'>Name</td>
                                                    <td className='right'>{(each.name).slice(7)}</td>
                                                </tr>
                                                <tr>
                                                    <td className='left'>Symobl</td>
                                                    <td>{each.chainId}</td>
                                                </tr>
                                                <tr>
                                                    <td className='left'>Address</td>
                                                    <td>{`#${(each.address).slice(0, 5)}`}</td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                            </table>
                                            <div className='icon-container'> <MdOutlineToken className="icon" /></div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className='price-container'>
                                {price.map(each => {
                                    return (
                                        <div className='card'>
                                            <table className=''>
                                                <tr>
                                                    <th className='left'>Price</th>
                                                </tr>
                                                <tr>
                                                    <td className='left'>PriceNative</td>
                                                    <td className='right'>{each.priceNative}</td>
                                                </tr>
                                                <tr>
                                                    <td className='left'>Prive USD</td>
                                                    <td>{each.priceUsd}</td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                            </table>
                                            <div className='icon-container'> <BsCurrencyDollar className="icon" /></div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Home;