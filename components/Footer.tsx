import FooterMenu from "./parts/FooterMenu";
import FooterSnsMenu from "./parts/FooterSnsMenu";
import SVGSprite from "./util/SVGSprite";
import { Link } from 'react-scroll';
import SVGInline from "./util/SVGInline";


export default function Footer() {
    return (
        <>
            <footer className=''>
                <div className="hidden @PC:block w-1920 h-176 translate-y-2">
                    <SVGSprite name='footer-pc' />
                </div>
                <div className="@PC:hidden w-375 h-36 translate-y-2">
                    <SVGSprite name='footer-sp' />
                </div>
                <div className="bg-beige relative pt-60 @PC:pt-20 pb-32 @PC:pb-65">
                    <div className="layout-main flex flex-col items-center @PC:items-start">
                        <div className="hidden @PC:block w-633 h-89">
                            <SVGSprite name='logo' />
                        </div>
                        <div className="@PC:hidden w-168 h-187">
                            <SVGSprite name='logo-index' />
                        </div>
                        <FooterSnsMenu />
                        <FooterMenu />
                        <Link to="top" smooth={true}>
                            <div className="cursor-pointer hover:scale-[1.15] transition-transform w-110 h-119 mt-50 ml-45 @PC:ml-0 @PC:mt-0 @PC:w-108 @PC:h-115 @PC:absolute @PC:right-121 @PC:bottom-65">
                                <SVGInline name="back-to-top" />
                            </div>
                        </Link>
                        <small className='text-12 @PC:text-13 text-gray mt-32 @PC:mt-48 text-center'>
                            © 株式会社パソナ農援隊 All rights reserved.
                        </small>
                        <div className="text-12 @PC:text-13 text-gray mt-12">
                            農林水産省委託事業 令和４年度マーケットイン輸出ビジネス拡大支援委託事業のうち訪日外国人対応による輸出促進連携支援事業（食文化コンテンツ関連の人材育成等委託事業）
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}
