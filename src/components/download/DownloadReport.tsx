import { useContext } from 'react';
import './DownloadReport.scss';
import { StateContext } from '../../context/AppContext';
import download from 'js-file-download';
import { client } from '../../helpers/utils';

export const DownloadReport = () => {
  const { state } = useContext(StateContext);
  const report = state.forecast.length > 0 ? state.forecast : localStorage.getItem('report');

  const fileName = 'test.pdf';
  async function getFile() {

    const response = await downloadFile();
    
    const content = response.headers['content-type']
    console.log(content, 'content');
    
    download(response.data, fileName, content)
 
  }
 
  async function downloadFile() {
    return client.get("https://ro.sms.destiny4you.com/getfile", {
      headers: {
        'content-type': '*'
      },
      params: {
        body: 'test'
      },
      responseType: 'blob',
    })

  }
  return (
    <div>
      <div className="download-button" onClick={getFile}>Download</div>
      <div className="report-box custom-font">
        {report}
      </div>
    </div>
  )
}