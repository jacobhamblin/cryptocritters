import Back from './back';
import Body from './body';
import Ear from './ear';
import Eye from './eye';
import Horn from './horn';
import Mouth from './mouth';
import Tail from './tail';

import './style.css';

const Critter = ({
  back,
  body,
  ear,
  eye,
  horn,
  mouth,
  tail,
}) => {
  return (
    <div className="Critter">
      <Back data={back} />
      <Body data={body} />
      <Ear data={ear} />
      <Eye data={eye} />
      <Horn data={horn} />
      <Mouth data={mouth} />
      <Tail data={tail} />
    </div>
  );
}

export default Critter;
