export default function(){
  this.transition(
    this.fromRoute('member.reservations'),
    this.toRoute('member.filters'),
    this.use('scrollThen', 'toUp'),
    this.reverse('scrollThen', 'toUp')
  );
  this.transition(
    this.use('crossFade'),
    this.reverse('crossFade')
  );
  this.transition(
    this.fromRoute('member.loading'),
    this.use('scrollThen', 'toUp'),
    this.reverse('scrollThen', 'toUp'),
  );

  this.transition(
    this.toRoute('member.activity'),
    this.use('scrollThen', 'toUp'),
    this.reverse('scrollThen', 'toUp'),
  );

};

