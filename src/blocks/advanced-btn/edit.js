/**
 * BLOCK: Kadence Advanced Btn
 *
 * Editor for Advanced Btn
 */
import times from 'lodash/times';
import FontIconPicker from '@fonticonpicker/react-fonticonpicker';
import GenIcon from '../../genicon';
import Ico from '../../svgicons';
import FaIco from '../../faicons';
import IcoNames from '../../svgiconsnames';
/**
 * Import Css
 */
import './editor.scss';
/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const {
	RichText,
	URLInput,
	InspectorControls,
	ColorPalette,
	BlockControls,
	AlignmentToolbar,
} = wp.editor;
const {
	Component,
	Fragment,
} = wp.element;
const {
	IconButton,
	PanelColor,
	Dashicon,
	TabPanel,
	PanelBody,
	RangeControl,
	SelectControl,
} = wp.components;

class KadenceAdvancedButton extends Component {
	constructor() {
		super( ...arguments );
		this.state = {
			hovered: 'false',
			btnFocused: 'false',
		};
	}
	componentDidMount() {
		if ( ! this.props.attributes.uniqueID ) {
			this.props.setAttributes( {
				uniqueID: '_' + this.props.clientId.substr( 2, 9 ),
			} );
		} else if ( this.props.attributes.uniqueID && this.props.attributes.uniqueID !== '_' + this.props.clientId.substr( 2, 9 ) ) {
			this.props.setAttributes( {
				uniqueID: '_' + this.props.clientId.substr( 2, 9 ),
			} );
		}
	}
	componentDidUpdate( prevProps ) {
		if ( ! this.props.isSelected && prevProps.isSelected && this.state.btnFocused ) {
			this.setState( {
				btnFocused: 'false',
			} );
		}
	}
	saveArrayUpdate( value, index ) {
		const { attributes, setAttributes } = this.props;
		const { btns } = attributes;

		const newItems = btns.map( ( item, thisIndex ) => {
			if ( index === thisIndex ) {
				item = { ...item, ...value };
			}

			return item;
		} );
		setAttributes( {
			btns: newItems,
		} );
	}
	render() {
		const { attributes: { btnCount, btns, hAlign }, className, setAttributes, isSelected } = this.props;
		const renderBtns = ( index ) => {
			return (
				<div className={ `btn-area-wrap kt-btn-${ index }-area` }>
					<span className={ `kt-button-wrap kt-btn-${ index }-action kt-btn-svg-show-${ ( ! btns[ index ].iconHover ? 'always' : 'hover' ) }` } onMouseOut={ onMouseOut } onMouseOver={ () => {
						if ( 1 === index ) {
							onHover1();
						} else if ( 2 === index ) {
							onHover2();
						} else if ( 3 === index ) {
							onHover3();
						} else if ( 4 === index ) {
							onHover4();
						} else {
							onHover();
						}
					} }>
						<span className={ `kt-button kt-button-${ index }` } style={ {
							backgroundColor: ( this.state.hovered && 'btn' + index === this.state.hovered ? btns[ index ].backgroundHover : btns[ index ].background ),
							color: ( this.state.hovered && 'btn' + index === this.state.hovered ? btns[ index ].colorHover : btns[ index ].color ),
							fontSize: btns[ index ].size + 'px',
							borderRadius: btns[ index ].borderRadius + 'px',
							borderWidth: btns[ index ].borderWidth + 'px',
							borderColor: ( this.state.hovered && 'btn' + index === this.state.hovered ? btns[ index ].borderHover : btns[ index ].border ),
							paddingLeft: btns[ index ].paddingLR + 'px',
							paddingRight: btns[ index ].paddingLR + 'px',
							paddingTop: btns[ index ].paddingTB + 'px',
							paddingBottom: btns[ index ].paddingTB + 'px',
						} } >
							{ btns[ index ].icon && 'left' === btns[ index ].iconSide && (
								<GenIcon className={ `kt-btn-svg-icon kt-btn-svg-icon-${ btns[ index ].icon } kt-btn-side-${ btns[ index ].iconSide }` } name={ btns[ index ].icon } size={ ( ! btns[ index ].size ? '14' : btns[ index ].size ) } icon={ ( 'fa' === btns[ index ].icon.substring( 0, 2 ) ? FaIco[ btns[ index ].icon ] : Ico[ btns[ index ].icon ] ) } />
							) }
							<RichText
								tagName="span"
								placeholder={ __( 'Button...' ) }
								value={ btns[ index ].text }
								unstableOnFocus={ () => {
									if ( 1 === index ) {
										onFocusBtn1();
									} else if ( 2 === index ) {
										onFocusBtn2();
									} else if ( 3 === index ) {
										onFocusBtn3();
									} else if ( 4 === index ) {
										onFocusBtn4();
									} else {
										onFocusBtn();
									}
								} }
								onChange={ value => {
									this.saveArrayUpdate( { text: value }, index );
								} }
								formattingControls={ [ 'bold', 'italic', 'strikethrough' ] }
								className={ 'kt-button-text' }
								keepPlaceholderOnFocus
							/>
							{ btns[ index ].icon && 'left' !== btns[ index ].iconSide && (
								<GenIcon className={ `kt-btn-svg-icon kt-btn-svg-icon-${ btns[ index ].icon } kt-btn-side-${ btns[ index ].iconSide }` } name={ btns[ index ].icon } size={ ( ! btns[ index ].size ? '14' : btns[ index ].size ) } icon={ ( 'fa' === btns[ index ].icon.substring( 0, 2 ) ? FaIco[ btns[ index ].icon ] : Ico[ btns[ index ].icon ] ) } />
							) }
						</span>
					</span>
					{ isSelected && ( ( this.state.btnFocused && 'btn' + [ index ] === this.state.btnFocused ) || ( this.state.btnFocused && 'false' === this.state.btnFocused && '0' === index ) ) && (
						<form
							key={ 'form-link' }
							onSubmit={ ( event ) => event.preventDefault() }
							className="blocks-button__inline-link">
							<Dashicon icon={ 'admin-links' } />
							<URLInput
								value={ btns[ index ].link }
								onChange={ value => {
									this.saveArrayUpdate( { link: value }, index );
								} }
							/>
							<IconButton
								icon={ 'editor-break' }
								label={ __( 'Apply' ) }
								type={ 'submit' }
							/>
						</form>
					) }
				</div>
			);
		};
		const onHover = () => {
			if ( 'btn0' !== this.state.hovered ) {
				this.setState( {
					hovered: 'btn0',
				} );
			}
		};
		const onHover1 = () => {
			if ( 'btn1' !== this.state.hovered ) {
				this.setState( {
					hovered: 'btn1',
				} );
			}
		};
		const onHover2 = () => {
			if ( 'btn2' !== this.state.hovered ) {
				this.setState( {
					hovered: 'btn2',
				} );
			}
		};
		const onHover3 = () => {
			if ( 'btn3' !== this.state.hovered ) {
				this.setState( {
					hovered: 'btn3',
				} );
			}
		};
		const onHover4 = () => {
			if ( 'btn4' !== this.state.hovered ) {
				this.setState( {
					hovered: 'btn4',
				} );
			}
		};
		const onMouseOut = () => {
			if ( 'false' !== this.state.hovered ) {
				this.setState( {
					hovered: 'false',
				} );
			}
		};
		const onFocusBtn = () => {
			if ( 'btn0' !== this.state.btnFocused ) {
				this.setState( {
					btnFocused: 'btn0',
				} );
			}
		};
		const onFocusBtn1 = () => {
			if ( 'btn1' !== this.state.btnFocused ) {
				this.setState( {
					btnFocused: 'btn1',
				} );
			}
		};
		const onFocusBtn2 = () => {
			if ( 'btn2' !== this.state.btnFocused ) {
				this.setState( {
					btnFocused: 'btn2',
				} );
			}
		};
		const onFocusBtn3 = () => {
			if ( 'btn3' !== this.state.btnFocused ) {
				this.setState( {
					btnFocused: 'btn3',
				} );
			}
		};
		const onFocusBtn4 = () => {
			if ( 'btn4' !== this.state.btnFocused ) {
				this.setState( {
					btnFocused: 'btn4',
				} );
			}
		};
		const tabControls = ( index ) => {
			return (
				<PanelBody
					title={ __( 'Button' ) + ' ' + ( index + 1 ) + ' ' + __( 'Settings' ) }
					initialOpen={ false }
				>
					<p className="components-base-control__label">{ __( 'Link' ) }</p>
					<URLInput
						value={ btns[ index ].link }
						onChange={ value => {
							this.saveArrayUpdate( { link: value }, index );
						} }
					/>
					<SelectControl
						label={ __( 'Link Target' ) }
						value={ btns[ index ].target }
						options={ [
							{ value: '_self', label: __( 'Same Window' ) },
							{ value: '_blank', label: __( 'New Window' ) },
						] }
						onChange={ value => {
							this.saveArrayUpdate( { target: value }, index );
						} }
					/>
					<RangeControl
						beforeIcon="editor-textcolor"
						afterIcon="editor-textcolor"
						label={ __( 'Button Text Size' ) }
						value={ btns[ index ].size }
						onChange={ value => {
							this.saveArrayUpdate( { size: value }, index );
						} }
						min={ 10 }
						max={ 100 }
					/>
					<RangeControl
						label={ __( 'Top and Bottom Padding' ) }
						value={ btns[ index ].paddingTB }
						onChange={ value => {
							this.saveArrayUpdate( { paddingTB: value }, index );
						} }
						min={ 0 }
						max={ 100 }
					/>
					<RangeControl
						label={ __( 'Left and Right Padding' ) }
						value={ btns[ index ].paddingLR }
						onChange={ value => {
							this.saveArrayUpdate( { paddingLR: value }, index );
						} }
						min={ 0 }
						max={ 100 }
					/>
					<RangeControl
						label={ __( 'Border Thickness' ) }
						value={ btns[ index ].borderWidth }
						onChange={ value => {
							this.saveArrayUpdate( { borderWidth: value }, index );
						} }
						min={ 0 }
						max={ 20 }
					/>
					<RangeControl
						label={ __( 'Border Radius' ) }
						value={ btns[ index ].borderRadius }
						onChange={ value => {
							this.saveArrayUpdate( { borderRadius: value }, index );
						} }
						min={ 0 }
						max={ 50 }
					/>
					<h2 className="kt-tab-wrap-title">{ __( 'Color Settings' ) }</h2>
					<TabPanel className="kt-inspect-tabs kt-hover-tabs"
						activeClass="active-tab"
						tabs={ [
							{
								name: 'normal' + index,
								title: __( 'Normal' ),
								className: 'kt-normal-tab',
							},
							{
								name: 'hover' + index,
								title: __( 'Hover' ),
								className: 'kt-hover-tab',
							},
						] }>
						{
							( tabName ) => {
								let tabout;
								if ( 'hover' + index === tabName ) {
									tabout = hoverSettings( index );
								} else {
									tabout = buttonSettings( index );
								}
								return <div>{ tabout }</div>;
							}
						}
					</TabPanel>
					<h2 className="kt-tool">{ __( 'Icon Settings' ) }</h2>
					<FontIconPicker
						icons={ IcoNames }
						value={ btns[ index ].icon }
						onChange={ value => {
							this.saveArrayUpdate( { icon: value }, index );
						} }
						appendTo="body"
						renderFunc={ renderSVG }
						theme="default"
						isMulti={ false }
					/>
					<SelectControl
						label={ __( 'Icon Location' ) }
						value={ btns[ index ].iconSide }
						options={ [
							{ value: 'right', label: __( 'Right' ) },
							{ value: 'left', label: __( 'Left' ) },
						] }
						onChange={ value => {
							this.saveArrayUpdate( { iconSide: value }, index );
						} }
					/>
				</PanelBody>
			);
		};
		const hoverSettings = ( index ) => {
			return (
				<div>
					<PanelColor
						title={ __( 'Hover Font Color' ) }
						colorValue={ btns[ index ].colorHover }
					>
						<ColorPalette
							value={ btns[ index ].colorHover }
							onChange={ value => {
								this.saveArrayUpdate( { colorHover: value }, index );
							} }
						/>
					</PanelColor>
					<PanelColor
						title={ __( 'Hover Background Color' ) }
						colorValue={ btns[ index ].backgroundHover }
					>
						<ColorPalette
							value={ btns[ index ].backgroundHover }
							onChange={ value => {
								this.saveArrayUpdate( { backgroundHover: value }, index );
							} }
						/>
					</PanelColor>
					<PanelColor
						title={ __( 'Button Hover Border Color' ) }
						colorValue={ btns[ index ].borderHover }
					>
						<ColorPalette
							value={ btns[ index ].borderHover }
							onChange={ value => {
								this.saveArrayUpdate( { borderHover: value }, index );
							} }
						/>
					</PanelColor>
				</div>
			);
		};
		const renderSVG = svg => (
			<GenIcon name={ svg } icon={ ( 'fa' === svg.substring( 0, 2 ) ? FaIco[ svg ] : Ico[ svg ] ) } />
		);
		const buttonSettings = ( index ) => {
			return (
				<div>
					<PanelColor
						title={ __( 'Font Color' ) }
						colorValue={ btns[ index ].color }
					>
						<ColorPalette
							value={ btns[ index ].color }
							onChange={ value => {
								this.saveArrayUpdate( { color: value }, index );
							} }
						/>
					</PanelColor>
					<PanelColor
						title={ __( 'Background Color' ) }
						colorValue={ btns[ index ].background }
					>
						<ColorPalette
							value={ btns[ index ].background }
							onChange={ value => {
								this.saveArrayUpdate( { background: value }, index );
							} }
						/>
					</PanelColor>
					<PanelColor
						title={ __( 'Border Color' ) }
						colorValue={ btns[ index ].border }
					>
						<ColorPalette
							value={ btns[ index ].border }
							onChange={ value => {
								this.saveArrayUpdate( { border: value }, index );
							} }
						/>
					</PanelColor>
				</div>
			);
		};
		const renderArray = (
			<div>
				{ times( btnCount, n => tabControls( n ) ) }
			</div>
		);
		const renderPreviewArray = (
			<div>
				{ times( btnCount, n => renderBtns( n ) ) }
			</div>
		);
		return (
			<Fragment>
				<div className={ `${ className } kt-btn-align-${ hAlign }` }>
					<BlockControls>
						<AlignmentToolbar
							value={ hAlign }
							onChange={ ( value ) => setAttributes( { hAlign: value } ) }
						/>
					</BlockControls>
					<InspectorControls>
						<PanelBody
							title={ __( 'Button Count' ) }
							initialOpen={ true }
						>
							<RangeControl
								label={ __( 'Number of Buttons' ) }
								value={ btnCount }
								onChange={ newcount => {
									const newbtns = btns;
									if ( newbtns.length < newcount ) {
										const amount = Math.abs( newcount - newbtns.length );
										{ times( amount, n => {
											newbtns.push( {
												text: newbtns[ 0 ].text,
												link: newbtns[ 0 ].link,
												target: newbtns[ 0 ].target,
												size: newbtns[ 0 ].size,
												paddingBT: newbtns[ 0 ].paddingBT,
												paddingLR: newbtns[ 0 ].paddingLR,
												color: newbtns[ 0 ].color,
												background: newbtns[ 0 ].background,
												border: newbtns[ 0 ].border,
												borderRadius: newbtns[ 0 ].borderRadius,
												borderWidth: newbtns[ 0 ].borderWidth,
												colorHover: newbtns[ 0 ].colorHover,
												backgroundHover: newbtns[ 0 ].backgroundHover,
												borderHover: newbtns[ 0 ].borderHover,
												icon: newbtns[ 0 ].icon,
												iconSide: newbtns[ 0 ].iconSide,
												iconHover: newbtns[ 0 ].iconHover,
											} );
										} ); }
										setAttributes( { btns: newbtns } );
									}
									setAttributes( { btnCount: newcount } );
								} }
								min={ 1 }
								max={ 5 }
							/>
						</PanelBody>
						{ renderArray }
					</InspectorControls>
					<div className={ 'btn-inner-wrap' } >
						{ renderPreviewArray }
					</div>
				</div>
			</Fragment>
		);
	}
}
export default ( KadenceAdvancedButton );