import { useContext, useEffect, useRef } from 'react';
import './DownloadReport.scss';
import { StateContext } from '../../context/AppContext';
import download from 'js-file-download';
import { client } from '../../helpers/utils';
import { GiSagittarius } from "react-icons/gi";
import { useSearchParams } from 'react-router-dom';
import ReactPixel, { AdvancedMatching } from 'react-facebook-pixel';

export const DownloadReport = () => {
  const [searchParams] = useSearchParams();

  const name = searchParams.get('name')
  const sagittarius = <GiSagittarius size={30} />

  const { state } = useContext(StateContext);
  const report = state.forecast.length > 0 ? state.forecast : localStorage.getItem('report');

  const fileName = `${name}2.pdf`;
  const myRef = useRef<null | HTMLDivElement>(null);

  const pixelId: string = searchParams.get('pixelId') || '';

  async function getFile() {
    const response = await downloadFile();
    const content = response.headers['content-type'];
    download(response.data, fileName, content);
  }

  useEffect(() => {
    const advancedMatching = { em: 'some@email.com' };
    const options = {
      autoConfig: true,
      debug: true,
    };
    ReactPixel.init(pixelId, advancedMatching as AdvancedMatching, options);
    ReactPixel.track('Purchase', { currency: "USD", value: 2.00 });

    if (myRef.current) {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" })
      }, 200)
    }
  }, []);

  async function downloadFile() {

    return client.get("https://ro.sms.destiny4you.com/getfile", {
      headers: {
        'content-type': '*'
      },
      params: {
        clientDetails: name,
      },
      responseType: 'blob',
    })
  }

  return (
    <div className="report-page-container" >
      <div ref={myRef} style={{marginBottom: 10}}>Best astro forecast ever</div>
      <div className="sign-box" >{sagittarius}</div>
      <div className="download-button" onClick={getFile}>Download report</div>
      <div className="report-box">
        {report}
      </div>
    </div>
  )
}