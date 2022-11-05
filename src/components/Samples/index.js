import React from 'react';
import chunks from 'array.chunk'
import Translate from '@docusaurus/Translate';
import reactStringReplace from 'react-string-replace'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const SampleTrList  = [
  "[customer_id] müşteriniz yeni bir sipariş oluşturdu [order_id] toplam sipariş tutarı [order_sum].",
  "Sayın [firstname] [lastname], [order_id] numaralı siparişinizin kargo takip numarası [shipping_number].",
  "Sayın [firstname] [lastname], [order_id] nolu siparişinizin durumu kargoya verildi olarak değiştirildi.",
  "Sayın [firstname] [lastname], [order_id] nolu siparişiniz işleme alındı.",
  "Sayın [firstname] [lastname], [order_id] nolu siparişiniz iptal edildi.",
  "Sayın [firstname] [lastname], [order_id] nolu siparişiniz tamamlandı.",
  "Sayın [firstname] [lastname], [order_id] nolu siparişinizin iade işlemi tamamlandı.",
  "Sayın [firstname] [lastname], [order_id] nolu siparişiniz stoklarda olmadığı için iptal edildi.",
  "Sayın [firstname] [lastname], [order_id] nolu siparişiniz için para iadesi kredi kartınıza yansıtıldı."
]

const SampleEnList  = [
  "[customer_id] your customer has created a new order [order_id] total order amount [order_sum].",
  "Dear [firstname] [lastname], the shipping tracking number of your order with [order_id] [shipping_number].",
  "Dear [firstname] [lastname], the status of your order [order_id] has been changed to shipped.",
  "Dear [firstname] [lastname], your order with [order_id] has been processed.",
  "Dear [firstname] [lastname], your order [order_id] has been cancelled.",
  "Dear [firstname] [lastname], your [order_id] has been completed.",
  "Dear [firstname] [lastname], the return of your order [order_id] has been completed.",
  "Dear [firstname] [lastname], your order [order_id] has been canceled because it is out of stock.",
  "Dear [firstname] [lastname], the refund for your order [order_id] has been credited to your credit card."
]

function SMS({body}) {

  const message = reactStringReplace(
    body,
    /(\[.*?\])/gm,
    (match, i) => <span key={`sms-${i}`} className="badge badge--cta">{match}</span>
  );

  return (
    <div className="col col--4 margin-top--md">
      <div className="card card-samples">
        <div className="card__body">
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
}

export default function Samples() {
  const {i18n} = useDocusaurusContext();
  let rows     = chunks(i18n.currentLocale === 'en' ? SampleEnList : SampleTrList, 3)

  const samples = rows.map((cols, idx) => {
    let row = cols.map((body, idx) => {
      return <SMS key={`sms-${idx}`} body={body} />
    })

    return <div key={`row-${idx}`} className="row">{row}</div>
  })

  return (
    <section className="samples padding-top--lg padding-bottom--lg">
      <div className="container">
				<h5 className="welcome-title">
					<Translate>Neler Yapabilirsiniz?</Translate>
				</h5>
        {samples}
      </div>
    </section>
  );
}
